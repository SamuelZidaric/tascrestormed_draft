/* eslint-disable no-undef */
/**
 * Shared front-end logic for the TASC-RestoreMed explorer mock-up.
 * The script detects which page is loaded and initialises the appropriate UI.
 */

document.addEventListener("DOMContentLoaded", () => {
  if (!Array.isArray(window.projects)) {
    console.warn("Project dataset unavailable – aborting UI initialisation.");
    return;
  }
  if (!Array.isArray(window.partners)) {
    console.warn("Partner dataset unavailable – aborting UI initialisation.");
    return;
  }

  const preparedProjects = prepareProjects(window.projects);
  const partnerIndex = buildPartnerIndex(preparedProjects);
  const enrichedPartners = buildEnrichedPartners(window.partners, partnerIndex);

  // Expose datasets for debugging in the console.
  window.__restoremed = {
    projects: preparedProjects,
    partners: enrichedPartners,
    partnerIndex,
  };

  const page = document.body.dataset.page;
  switch (page) {
    case "projects":
      initProjectExplorer(preparedProjects);
      break;
    case "dashboard":
      initDashboardOverview(preparedProjects, enrichedPartners);
      break;
    case "project-detail":
      initProjectDetail(preparedProjects);
      break;
    case "partners":
      initPartnerDirectory(enrichedPartners);
      break;
    case "partner-detail":
      initPartnerDetail(enrichedPartners);
      break;
    default:
      console.warn(`Unknown page type: ${page}`);
  }
});

/* -------------------------------------------------------------------------- */
/* Data preparation                                                           */
/* -------------------------------------------------------------------------- */

function prepareProjects(projects) {
  return projects.map((project) => {
    // Normalize field names to match expected structure
    const normalizedProject = {
      ...project,
      id: String(project.id), // Ensure ID is a string for consistency
      summary: project.description || project.summary,
      missionObjectives: project.objectives || project.missionObjectives || [],
      topicClusters: project.clusters || project.topicClusters || [],
      technologyPillars: project.technologies || project.technologyPillars || [],
      missionZone: project.missionZone || (project.geographicZones && project.geographicZones[0]) || "Unknown",
      startYear: project.startYear || (project.startDate ? new Date(project.startDate).getFullYear() : null),
      budget: project.budget || (project.totalBudget ? `€${(project.totalBudget / 1000000).toFixed(2)}M` : "—"),
      funding: project.funding || (project.euContribution ? `€${(project.euContribution / 1000000).toFixed(2)}M` : "—"),
      partners: project.partners || [],
      missionKpis: project.missionKpis || [],
      comparison: project.comparison || {
        euContribution: project.euContribution ? `€${(project.euContribution / 1000000).toFixed(2)}M` : "—",
        durationMonths: project.startDate && project.endDate
          ? Math.round((new Date(project.endDate) - new Date(project.startDate)) / (1000 * 60 * 60 * 24 * 30))
          : "—",
        missionZoneFocus: project.missionZone || (project.geographicZones && project.geographicZones[0]) || "—",
        technologyFocus: project.technologies && project.technologies[0] || project.technologyPillars && project.technologyPillars[0] || "—"
      },
      insights: project.insights || {
        technologyHighlights: [],
        engagementActions: []
      }
    };

    const partnerNames = normalizedProject.partners.map((partner) => typeof partner === 'string' ? partner : partner.name);
    const searchCorpus = normalizeText(
      [
        normalizedProject.id,
        normalizedProject.title,
        normalizedProject.acronym,
        normalizedProject.summary,
        normalizedProject.funding,
        normalizedProject.leadPartner,
        normalizedProject.leadCountry,
        normalizedProject.missionZone,
        normalizedProject.missionPillars.join(" "),
        normalizedProject.missionObjectives.join(" "),
        normalizedProject.topicClusters.join(" "),
        normalizedProject.technologyPillars.join(" "),
        (normalizedProject.keywords || []).join(" "),
        partnerNames.join(" "),
        (normalizedProject.missionKpis || []).join(" "),
      ]
        .filter(Boolean)
        .join(" "),
    );

    return {
      ...normalizedProject,
      partnerNames,
      searchCorpus,
    };
  });
}

function buildPartnerIndex(projects) {
  const index = new Map();

  projects.forEach((project) => {
    // Handle case where partners might be empty array
    if (!project.partners || project.partners.length === 0) {
      return;
    }

    project.partners.forEach((partner) => {
      if (!index.has(partner.id)) {
        index.set(partner.id, {
          id: partner.id,
          projects: [],
          missionPillars: new Set(),
          missionObjectives: new Set(),
          topicClusters: new Set(),
          technologyPillars: new Set(),
          missionZones: new Set(),
          statuses: new Set(),
          roles: { lead: 0, partner: 0 },
          years: new Set(),
        });
      }

      const entry = index.get(partner.id);
      entry.projects.push({
        projectId: project.id,
        title: project.title,
        acronym: project.acronym,
        role: partner.role,
        status: project.status,
        missionPillars: [...project.missionPillars],
        missionObjectives: [...project.missionObjectives],
        technologyPillars: [...project.technologyPillars],
        topicClusters: [...project.topicClusters],
        missionZone: project.missionZone,
        startDate: project.startDate,
        endDate: project.endDate,
        startYear: project.startYear,
        budget: project.budget,
        funding: project.funding,
      });

      project.missionPillars.forEach((value) => entry.missionPillars.add(value));
      project.missionObjectives.forEach((value) => entry.missionObjectives.add(value));
      project.topicClusters.forEach((value) => entry.topicClusters.add(value));
      project.technologyPillars.forEach((value) => entry.technologyPillars.add(value));
      entry.missionZones.add(project.missionZone);
      entry.statuses.add(project.status);
      entry.years.add(project.startYear);

      if (partner.role === "Lead") {
        entry.roles.lead += 1;
      } else {
        entry.roles.partner += 1;
      }
    });
  });

  return index;
}

function buildEnrichedPartners(partnerMetadata, partnerIndex) {
  return partnerMetadata
    .map((meta) => {
      const derived = partnerIndex.get(meta.id);
      if (!derived) {
        return {
          ...meta,
          totalProjects: 0,
          leadCount: 0,
          partnerCount: 0,
          missionPillars: [],
          missionObjectives: [],
          technologyPillars: [],
          topicClusters: [],
          missionZones: [],
          statuses: [],
          years: [],
          projects: [],
        };
      }

      return {
        ...meta,
        totalProjects: derived.projects.length,
        leadCount: derived.roles.lead,
        partnerCount: derived.roles.partner,
        missionPillars: sortAlpha(Array.from(derived.missionPillars)),
        missionObjectives: sortAlpha(Array.from(derived.missionObjectives)),
        technologyPillars: sortAlpha(Array.from(derived.technologyPillars)),
        topicClusters: sortAlpha(Array.from(derived.topicClusters)),
        missionZones: sortAlpha(Array.from(derived.missionZones)),
        statuses: sortAlpha(Array.from(derived.statuses)),
        years: Array.from(derived.years).sort((a, b) => b - a),
        projects: derived.projects.sort((a, b) => a.projectId.localeCompare(b.projectId)),
      };
    })
    .sort((a, b) => b.totalProjects - a.totalProjects || a.name.localeCompare(b.name));
}

/* -------------------------------------------------------------------------- */
/* Dashboard overview                                                         */
/* -------------------------------------------------------------------------- */

function initDashboardOverview(projects, partners) {
  const metricsContainer = document.getElementById("dashboardMetrics");
  if (!metricsContainer) return;

  const totalProjects = projects.length;
  const activeProjects = projects.filter((project) => project.status === "Active").length;
  const missionZones = new Set(projects.map((project) => project.missionZone)).size;
  const engagedPartners = partners.filter((partner) => partner.totalProjects > 0).length;

  metricsContainer.innerHTML = [
    renderStatCard("Total projects", totalProjects),
    renderStatCard("Active projects", activeProjects),
    renderStatCard("Mission zones", missionZones),
    renderStatCard("Partners engaged", engagedPartners),
  ].join("");

  const pillarList = document.getElementById("pillarCoverage");
  if (pillarList) {
    const pillarCounts = countValues(projects.flatMap((project) => project.missionPillars));
    if (pillarCounts.length === 0) {
      pillarList.innerHTML = `<li class="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500">No mission pillar data available.</li>`;
    } else {
      const maxCount = pillarCounts[0][1];
      pillarList.innerHTML = pillarCounts
        .slice(0, 6)
        .map(
          ([pillar, count]) => `
            <li class="rounded-2xl bg-slate-50 px-4 py-3">
              <div class="flex items-center justify-between text-sm font-medium text-slate-700">
                <span>${escapeHtml(pillar)}</span>
                <span class="text-blue-600">${count}</span>
              </div>
              <div class="mt-2 h-1.5 rounded-full bg-slate-200">
                <span class="block h-full rounded-full bg-blue-500" style="width: ${Math.max(8, Math.round((count / maxCount) * 100))}%"></span>
              </div>
            </li>
          `,
        )
        .join("");
    }
  }

  const techCanvas = document.getElementById("techPillarChart");
  if (techCanvas && typeof Chart !== "undefined") {
    const techCounts = countValues(projects.flatMap((project) => project.technologyPillars));
    if (techCounts.length === 0) {
      techCanvas.parentElement.classList.add("hidden");
    } else {
      const labels = techCounts.map(([label]) => label);
      const data = techCounts.map(([, count]) => count);
      const palette = ["#1d4ed8", "#0f766e", "#f97316", "#9333ea", "#ec4899"];

      new Chart(techCanvas, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Projects",
              data,
              backgroundColor: labels.map((_, index) => palette[index % palette.length]),
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              ticks: { font: { size: 12 } },
              grid: { display: false },
            },
            y: {
              beginAtZero: true,
              precision: 0,
              ticks: { stepSize: 1, font: { size: 12 } },
            },
          },
          plugins: {
            legend: { display: false },
          },
        },
      });
    }
  }
}

/* -------------------------------------------------------------------------- */
/* Project explorer                                                           */
/* -------------------------------------------------------------------------- */

function initProjectExplorer(projects) {
  const INITIAL_BATCH_SIZE = 50;
  const LOAD_MORE_BATCH_SIZE = 50;

  const state = {
    searchQuery: "",
    searchTokens: [],
    filters: {
      status: new Set(),
      startYear: new Set(),
      missionZone: new Set(),
      missionPillars: new Set(),
      missionObjectives: new Set(),
      topicClusters: new Set(),
      technologyPillars: new Set(),
    },
    selectedProjects: new Set(),
    displayedCount: INITIAL_BATCH_SIZE,
    filteredProjects: [],
  };

  const refs = {
    searchInput: document.getElementById("projectSearch"),
    resultsCount: document.getElementById("projectResultsCount"),
    selectedCount: document.getElementById("projectSelectedCount"),
    resetButton: document.getElementById("resetProjectFilters"),
    exportButton: document.getElementById("exportProjects"),
    compareButton: document.getElementById("compareSelectedProjects"),
    compareHint: document.getElementById("compareHint"),
    compareModalHint: document.getElementById("compareModalHint"),
    tableBody: document.getElementById("projectTableBody"),
    emptyState: document.getElementById("projectEmptyState"),
    filtersContainer: document.getElementById("projectFilters"),
    compareModal: document.getElementById("compareModal"),
    compareModalClose: document.getElementById("closeCompareModal"),
    compareTableHead: document.getElementById("compareTableHead"),
    compareTableBody: document.getElementById("compareTableBody"),
    loadMoreButton: null,
    loadMoreContainer: null,
  };

  if (!refs.searchInput || !refs.tableBody || !refs.filtersContainer) {
    console.warn("Project explorer markup incomplete.");
    return;
  }

  // Create load more button container
  const tableSection = refs.tableBody.closest('section');
  if (tableSection) {
    const loadMoreContainer = document.createElement('div');
    loadMoreContainer.id = 'loadMoreContainer';
    loadMoreContainer.className = 'hidden border-t border-slate-200 bg-slate-50 px-6 py-6 text-center';
    loadMoreContainer.innerHTML = `
      <button id="loadMoreButton" class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
        Load More Projects
      </button>
      <p class="mt-2 text-sm text-slate-500">
        Showing <span id="displayedProjectsCount">0</span> of <span id="totalFilteredCount">0</span> projects
      </p>
    `;
    tableSection.appendChild(loadMoreContainer);
    refs.loadMoreContainer = loadMoreContainer;
    refs.loadMoreButton = document.getElementById('loadMoreButton');
  }

  const filterDefinitions = getProjectFilterDefinitions(projects);
  const filterApi = setupFilterSystem(refs.filtersContainer, filterDefinitions, state.filters, () => {
    state.displayedCount = INITIAL_BATCH_SIZE;
    refreshProjects();
  });

  refs.searchInput.addEventListener(
    "input",
    debounce((event) => {
      const value = event.target.value || "";
      state.searchQuery = value;
      state.searchTokens = tokenize(value);
      state.displayedCount = INITIAL_BATCH_SIZE;
      refreshProjects();
    }, 200),
  );

  refs.resetButton?.addEventListener("click", () => {
    state.searchQuery = "";
    state.searchTokens = [];
    state.selectedProjects.clear();
    state.displayedCount = INITIAL_BATCH_SIZE;
    refs.searchInput.value = "";
    filterApi.resetAll();
    refreshProjects();
  });

  refs.loadMoreButton?.addEventListener("click", () => {
    state.displayedCount += LOAD_MORE_BATCH_SIZE;
    refreshProjects();
  });

  refs.exportButton?.addEventListener("click", () => {
    exportProjectsToWorkbook(state.filteredProjects);
  });

  refs.compareButton?.addEventListener("click", () => {
    if (state.selectedProjects.size < 2) return;
    openCompareModal(state, projects, refs);
  });

  refs.compareModalClose?.addEventListener("click", () => closeCompareModal(refs.compareModal));
  refs.compareModal?.addEventListener("click", (event) => {
    if (event.target === refs.compareModal) closeCompareModal(refs.compareModal);
  });

  refs.tableBody.addEventListener("click", (event) => {
    const checkbox = event.target.closest("input[type='checkbox'][data-project-id]");
    if (checkbox) {
      const projectId = checkbox.dataset.projectId;
      if (!projectId) return;
      if (checkbox.checked) {
        state.selectedProjects.add(projectId);
      } else {
        state.selectedProjects.delete(projectId);
      }
      updateSelectionSummary(refs, state);
      updateCompareButton(refs.compareButton, refs.compareHint, state.selectedProjects.size);
      return;
    }

    const row = event.target.closest("tr[data-project-id]");
    if (!row) return;
    const projectId = row.dataset.projectId;
    window.location.href = `project.html?id=${encodeURIComponent(projectId)}`;
  });

  refreshProjects();

  function refreshProjects() {
    state.filteredProjects = getFilteredProjects(projects, state);
    const displayed = state.filteredProjects.slice(0, state.displayedCount);

    renderProjectTable(refs.tableBody, displayed, state.selectedProjects);
    updateResultsSummary(refs.resultsCount, state.filteredProjects.length, projects.length);
    updateSelectionSummary(refs, state);
    toggleEmptyState(refs.emptyState, state.filteredProjects.length === 0);
    updateCompareButton(refs.compareButton, refs.compareHint, state.selectedProjects.size);

    // Update load more button
    if (refs.loadMoreContainer) {
      const hasMore = state.displayedCount < state.filteredProjects.length;
      refs.loadMoreContainer.classList.toggle('hidden', !hasMore || state.filteredProjects.length === 0);

      const displayedCountEl = document.getElementById('displayedProjectsCount');
      const totalCountEl = document.getElementById('totalFilteredCount');
      if (displayedCountEl) displayedCountEl.textContent = Math.min(state.displayedCount, state.filteredProjects.length);
      if (totalCountEl) totalCountEl.textContent = state.filteredProjects.length;
    }
  }
}

function getProjectFilterDefinitions(projects) {
  const options = {
    status: new Set(),
    startYear: new Set(),
    missionZone: new Set(),
    missionPillars: new Set(),
    missionObjectives: new Set(),
    topicClusters: new Set(),
    technologyPillars: new Set(),
  };

  projects.forEach((project) => {
    options.status.add(project.status);
    options.startYear.add(String(project.startYear));
    options.missionZone.add(project.missionZone);
    project.missionPillars.forEach((value) => options.missionPillars.add(value));
    project.missionObjectives.forEach((value) => options.missionObjectives.add(value));
    project.topicClusters.forEach((value) => options.topicClusters.add(value));
    project.technologyPillars.forEach((value) => options.technologyPillars.add(value));
  });

  return [
    { id: "status", label: "Status", options: sortAlpha(Array.from(options.status)) },
    { id: "startYear", label: "Start Year", options: Array.from(options.startYear).sort((a, b) => Number(b) - Number(a)) },
    { id: "missionZone", label: "Mission Zone", options: sortAlpha(Array.from(options.missionZone)) },
    { id: "missionPillars", label: "Mission Pillars", options: sortAlpha(Array.from(options.missionPillars)) },
    { id: "missionObjectives", label: "Mission Objectives", options: sortAlpha(Array.from(options.missionObjectives)) },
    { id: "topicClusters", label: "Topic Clusters", options: sortAlpha(Array.from(options.topicClusters)) },
    { id: "technologyPillars", label: "Technology Pillars", options: sortAlpha(Array.from(options.technologyPillars)) },
  ];
}

function getFilteredProjects(projects, state) {
  return projects.filter((project) => {
    if (!matchesSearch(project.searchCorpus, state.searchTokens)) {
      return false;
    }

    const { filters } = state;
    if (!matchesValue(project.status, filters.status)) return false;
    if (!matchesValue(String(project.startYear), filters.startYear)) return false;
    if (!matchesValue(project.missionZone, filters.missionZone)) return false;
    if (!matchesArray(project.missionPillars, filters.missionPillars)) return false;
    if (!matchesArray(project.missionObjectives, filters.missionObjectives)) return false;
    if (!matchesArray(project.topicClusters, filters.topicClusters)) return false;
    if (!matchesArray(project.technologyPillars, filters.technologyPillars)) return false;

    return true;
  });
}

function renderProjectTable(tbody, projects, selectedSet) {
  if (!tbody) return;
  tbody.innerHTML = projects
    .map((project) => {
      const timeline = formatTimeline(project.startDate, project.endDate);
      const missionPills = renderTagGroup(project.missionPillars, "bg-blue-50 text-blue-700");
      const technologyPills = renderTagGroup(project.technologyPillars, "bg-emerald-50 text-emerald-700");
      const objectivePreview = project.missionObjectives.slice(0, 2).join(" • ");
      const objectivesExtra = project.missionObjectives.length > 2 ? ` +${project.missionObjectives.length - 2}` : "";
      const isChecked = selectedSet.has(project.id) ? "checked" : "";

      return `
        <tr data-project-id="${project.id}" class="group cursor-pointer border-b border-slate-100 bg-white transition hover:bg-slate-50">
          <td class="px-3 py-4 align-top">
            <input type="checkbox" data-project-id="${project.id}" ${isChecked} class="compare-checkbox h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" aria-label="Select ${escapeHtml(project.title)} for comparison" />
          </td>
          <td class="px-3 py-4 align-top">
            <div class="text-xs font-semibold uppercase tracking-wide text-slate-400">${project.id}</div>
            <div class="mt-1 text-sm font-semibold text-slate-900">${escapeHtml(project.title)}</div>
            <div class="mt-1 text-xs text-slate-500">${escapeHtml(project.summary)}</div>
          </td>
          <td class="px-3 py-4 align-top text-sm font-semibold text-slate-700">${escapeHtml(project.acronym)}</td>
          <td class="px-3 py-4 align-top">
            <span class="${getStatusBadgeClasses(project.status)}">${escapeHtml(project.status)}</span>
          </td>
          <td class="px-3 py-4 align-top text-sm text-slate-600">${timeline}</td>
          <td class="px-3 py-4 align-top">
            <div class="text-sm font-medium text-slate-800">${escapeHtml(project.leadPartner)}</div>
            <div class="text-xs text-slate-500">${escapeHtml(project.leadCountry)}</div>
          </td>
          <td class="px-3 py-4 align-top text-sm text-slate-600">${escapeHtml(project.missionZone)}</td>
          <td class="px-3 py-4 align-top text-sm text-slate-700">
            ${missionPills}
          </td>
          <td class="px-3 py-4 align-top text-sm text-slate-700">
            <div class="text-xs text-slate-600">${escapeHtml(objectivePreview)}${objectivesExtra}</div>
            <div class="mt-2 flex flex-wrap gap-1">
              ${technologyPills}
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

function openCompareModal(state, projects, refs) {
  if (!refs.compareModal) return;
  const selectedProjects = projects.filter((project) => state.selectedProjects.has(project.id));
  if (selectedProjects.length < 2) return;

  const limitedSelection = selectedProjects.slice(0, 4);
  if (selectedProjects.length > 4 && refs.compareModalHint) {
    refs.compareModalHint.textContent = "Showing first four selected projects.";
  } else if (refs.compareModalHint) {
    refs.compareModalHint.textContent = "";
  }

  refs.compareTableHead.innerHTML = `
    <tr>
      <th scope="col" class="min-w-[160px] px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Metric</th>
      ${limitedSelection
        .map(
          (project) => `
        <th scope="col" class="px-3 py-2 text-left text-sm font-semibold text-slate-800">
          ${escapeHtml(project.acronym)}
          <div class="text-xs font-normal text-slate-500">${escapeHtml(project.title)}</div>
        </th>`,
        )
        .join("")}
    </tr>
  `;

  const comparisonRows = [
    ["Status", (project) => `<span class="${getStatusBadgeClasses(project.status)}">${escapeHtml(project.status)}</span>`],
    ["Mission Zone", (project) => escapeHtml(project.missionZone)],
    ["Mission Pillars", (project) => renderInlineList(project.missionPillars)],
    ["Mission Objectives", (project) => renderInlineList(project.missionObjectives)],
    ["Technology Pillars", (project) => renderInlineList(project.technologyPillars)],
    ["Topic Clusters", (project) => renderInlineList(project.topicClusters)],
    ["Lead Partner", (project) => `${escapeHtml(project.leadPartner)} (${escapeHtml(project.leadCountry)})`],
    ["Budget", (project) => escapeHtml(project.budget || "—")],
    ["EU Contribution", (project) => escapeHtml(project.comparison.euContribution || "—")],
    ["Duration (months)", (project) => escapeHtml(String(project.comparison.durationMonths || "—"))],
    ["Mission Focus", (project) => escapeHtml(project.comparison.missionZoneFocus || "—")],
    ["Technology Focus", (project) => escapeHtml(project.comparison.technologyFocus || "—")],
    ["Mission KPIs", (project) => renderInlineList(project.missionKpis || [])],
  ];

  refs.compareTableBody.innerHTML = comparisonRows
    .map(
      ([label, projector]) => `
      <tr class="border-t border-slate-200">
        <th scope="row" class="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">${escapeHtml(label)}</th>
        ${limitedSelection
          .map((project) => `<td class="px-3 py-3 align-top text-sm text-slate-700">${projector(project)}</td>`)
          .join("")}
      </tr>
    `,
    )
    .join("");

  refs.compareModal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
}

function closeCompareModal(modal) {
  if (!modal) return;
  modal.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

function updateResultsSummary(element, filteredCount, totalCount) {
  if (!element) return;
  const suffix = filteredCount === 1 ? "project" : "projects";
  const totalSuffix = totalCount === 1 ? "project" : "projects";
  element.textContent = `${filteredCount} ${suffix} · ${totalCount} total ${totalSuffix}`;
}

function updateSelectionSummary(refs, state) {
  if (refs.selectedCount) {
    const count = state.selectedProjects.size;
    const suffix = count === 1 ? "project" : "projects";
    refs.selectedCount.textContent = count > 0 ? `${count} ${suffix} selected` : "None selected";
  }
}

function toggleEmptyState(element, shouldShow) {
  if (!element) return;
  element.classList.toggle("hidden", !shouldShow);
}

function updateCompareButton(button, hintElement, selectionSize) {
  if (!button) return;
  button.disabled = selectionSize < 2;
  if (hintElement) {
    if (selectionSize === 0) {
      hintElement.textContent = "Select at least two projects to compare.";
    } else if (selectionSize === 1) {
      hintElement.textContent = "Select one more project to enable comparison.";
    } else if (selectionSize > 4) {
      hintElement.textContent = "Comparison shows the first four selected projects.";
    } else {
      hintElement.textContent = "";
    }
  }
}

/* -------------------------------------------------------------------------- */
/* Partner directory                                                          */
/* -------------------------------------------------------------------------- */

function initPartnerDirectory(partners) {
  const state = {
    searchQuery: "",
    searchTokens: [],
    filters: {
      country: new Set(),
      type: new Set(),
      role: new Set(),
      missionPillars: new Set(),
      missionObjectives: new Set(),
      technologyPillars: new Set(),
    },
  };

  const refs = {
    searchInput: document.getElementById("partnerSearch"),
    resultsCount: document.getElementById("partnerResultsCount"),
    resetButton: document.getElementById("resetPartnerFilters"),
    exportButton: document.getElementById("exportPartners"),
    tableBody: document.getElementById("partnerTableBody"),
    emptyState: document.getElementById("partnerEmptyState"),
    filtersContainer: document.getElementById("partnerFilters"),
  };

  if (!refs.searchInput || !refs.tableBody || !refs.filtersContainer) {
    console.warn("Partner directory markup incomplete.");
    return;
  }

  const filterDefinitions = getPartnerFilterDefinitions(partners);
  const filterApi = setupFilterSystem(refs.filtersContainer, filterDefinitions, state.filters, refreshPartners);

  refs.searchInput.addEventListener(
    "input",
    debounce((event) => {
      const value = event.target.value || "";
      state.searchQuery = value;
      state.searchTokens = tokenize(value);
      refreshPartners();
    }, 200),
  );

  refs.resetButton?.addEventListener("click", () => {
    state.searchQuery = "";
    state.searchTokens = [];
    refs.searchInput.value = "";
    filterApi.resetAll();
    refreshPartners();
  });

  refs.exportButton?.addEventListener("click", () => {
    const visiblePartners = getFilteredPartners(partners, state);
    exportPartnersToWorkbook(visiblePartners);
  });

  refs.tableBody.addEventListener("click", (event) => {
    const row = event.target.closest("tr[data-partner-id]");
    if (!row) return;
    const partnerId = row.dataset.partnerId;
    window.location.href = `partner.html?id=${encodeURIComponent(partnerId)}`;
  });

  refreshPartners();

  function refreshPartners() {
    const filtered = getFilteredPartners(partners, state);
    renderPartnerTable(refs.tableBody, filtered);
    updateResultsSummary(refs.resultsCount, filtered.length, partners.length);
    toggleEmptyState(refs.emptyState, filtered.length === 0);
  }
}

function getPartnerFilterDefinitions(partners) {
  const options = {
    country: new Set(),
    type: new Set(),
    missionPillars: new Set(),
    missionObjectives: new Set(),
    technologyPillars: new Set(),
  };

  partners.forEach((partner) => {
    options.country.add(partner.country);
    options.type.add(partner.type);
    partner.missionPillars.forEach((value) => options.missionPillars.add(value));
    partner.missionObjectives.forEach((value) => options.missionObjectives.add(value));
    partner.technologyPillars.forEach((value) => options.technologyPillars.add(value));
  });

  return [
    { id: "country", label: "Country", options: sortAlpha(Array.from(options.country)) },
    { id: "type", label: "Organisation Type", options: sortAlpha(Array.from(options.type)) },
    { id: "role", label: "Role", options: ["Lead", "Partner"] },
    { id: "missionPillars", label: "Mission Pillars", options: sortAlpha(Array.from(options.missionPillars)) },
    { id: "missionObjectives", label: "Mission Objectives", options: sortAlpha(Array.from(options.missionObjectives)) },
    { id: "technologyPillars", label: "Technology Pillars", options: sortAlpha(Array.from(options.technologyPillars)) },
  ];
}

function getFilteredPartners(partners, state) {
  return partners.filter((partner) => {
    if (!matchesSearch(partnerSearchCorpus(partner), state.searchTokens)) {
      return false;
    }

    const { filters } = state;
    if (!matchesValue(partner.country, filters.country)) return false;
    if (!matchesValue(partner.type, filters.type)) return false;

    if (filters.role.size > 0) {
      const hasLead = partner.leadCount > 0;
      const hasPartner = partner.partnerCount > 0;
      const requiredLead = filters.role.has("Lead");
      const requiredPartner = filters.role.has("Partner");
      const roleMatches =
        (requiredLead && hasLead) ||
        (requiredPartner && hasPartner) ||
        (requiredLead && requiredPartner && hasLead && hasPartner);
      if (!roleMatches) return false;
    }

    if (!matchesArray(partner.missionPillars, filters.missionPillars)) return false;
    if (!matchesArray(partner.missionObjectives, filters.missionObjectives)) return false;
    if (!matchesArray(partner.technologyPillars, filters.technologyPillars)) return false;

    return true;
  });
}

function renderPartnerTable(tbody, partners) {
  if (!tbody) return;
  tbody.innerHTML = partners
    .map((partner) => {
      const missionPills = renderTagGroup(partner.missionPillars.slice(0, 3), "bg-slate-100 text-slate-700");
      const roleSummary = buildRoleSummary(partner.leadCount, partner.partnerCount);
      return `
        <tr data-partner-id="${partner.id}" class="group cursor-pointer border-b border-slate-100 bg-white transition hover:bg-slate-50">
          <td class="px-3 py-4 align-top">
            <div class="text-sm font-semibold text-blue-800 group-hover:underline">${escapeHtml(partner.name)}</div>
            <div class="mt-1 text-xs uppercase tracking-wide text-slate-400">${escapeHtml(partner.acronym)}</div>
            <div class="mt-2 text-xs text-slate-500">${escapeHtml(partner.focus)}</div>
          </td>
          <td class="px-3 py-4 align-top text-sm text-slate-600">${escapeHtml(partner.country)}</td>
          <td class="px-3 py-4 align-top text-sm text-slate-600">${escapeHtml(partner.type)}</td>
          <td class="px-3 py-4 align-top text-sm font-semibold text-slate-800">${partner.totalProjects}</td>
          <td class="px-3 py-4 align-top text-xs text-slate-500">${roleSummary}</td>
          <td class="px-3 py-4 align-top">
            <div class="flex flex-wrap gap-1">
              ${missionPills}
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

/* -------------------------------------------------------------------------- */
/* Partner detail                                                             */
/* -------------------------------------------------------------------------- */

function initPartnerDetail(partners) {
  const params = new URLSearchParams(window.location.search);
  const partnerId = params.get("id");
  const partner = partners.find((entry) => entry.id === partnerId);

  const header = document.getElementById("partnerHeader");
  const stats = document.getElementById("partnerStats");
  const projectsContainer = document.getElementById("partnerProjects");
  const missionList = document.getElementById("partnerMissionTags");
  const notFound = document.getElementById("partnerNotFound");

  if (!partner || !header || !projectsContainer) {
    if (notFound) notFound.classList.remove("hidden");
    if (header) header.classList.add("hidden");
    return;
  }

  renderPartnerHeader(header, partner);
  renderPartnerStats(stats, partner);
  renderPartnerProjects(projectsContainer, partner.projects);
  renderPartnerMissionTags(missionList, partner);

  if (typeof Chart !== "undefined") {
    renderPartnerChart(partner);
  }
}

function renderPartnerHeader(container, partner) {
  container.innerHTML = `
    <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <div class="text-xs font-semibold uppercase tracking-[0.25em] text-blue-500">Mission Partner</div>
        <h1 class="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">${escapeHtml(partner.name)}</h1>
        <div class="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-500">${escapeHtml(partner.acronym)}</span>
          <span class="text-slate-400">•</span>
          <span>${escapeHtml(partner.type)}</span>
          <span class="text-slate-400">•</span>
          <span>${escapeHtml(partner.country)}</span>
        </div>
        <p class="mt-3 max-w-3xl text-sm text-slate-600">${escapeHtml(partner.focus)}</p>
        <div class="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
          ${partner.specialties
            .map((specialty) => `<span class="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">${escapeHtml(specialty)}</span>`)
            .join("")}
        </div>
      </div>
      <div class="flex flex-col items-start gap-2 text-sm">
        <a href="partners.html" class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-blue-400 hover:text-blue-600">
          ← Back to directory
        </a>
        ${
          partner.website
            ? `<a href="${escapeAttribute(partner.website)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700">
          Visit website
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.5 6H18m0 0v4.5M18 6 9.75 14.25m0 0H6m3.75 0V18" />
          </svg>
        </a>`
            : ""
        }
      </div>
    </div>
  `;
}

function renderPartnerStats(container, partner) {
  if (!container) return;
  container.innerHTML = `
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      ${renderStatCard("Total projects", partner.totalProjects)}
      ${renderStatCard("Lead roles", partner.leadCount)}
      ${renderStatCard("Partner roles", partner.partnerCount)}
      ${renderStatCard("Mission zones reached", partner.missionZones.length)}
    </div>
  `;
}

function renderPartnerProjects(container, projects) {
  if (!projects || projects.length === 0) {
    container.innerHTML =
      '<p class="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">Projects connected to this partner will appear here once data is available.</p>';
    return;
  }

  container.innerHTML = projects
    .map((project) => {
      const timeline = formatTimeline(project.startDate, project.endDate);
      const missionTags = renderTagGroup(project.missionPillars.slice(0, 3), "bg-emerald-50 text-emerald-700");
      const objectiveTags = renderTagGroup(project.missionObjectives.slice(0, 2), "bg-blue-50 text-blue-700");
      return `
        <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <header class="flex flex-wrap items-start justify-between gap-2">
            <div>
              <a href="project.html?id=${encodeURIComponent(project.projectId)}" class="text-lg font-semibold text-slate-900 hover:text-blue-700">
                ${escapeHtml(project.title)}
              </a>
              <div class="mt-1 text-xs uppercase tracking-wide text-slate-400">${escapeHtml(project.projectId)} · ${escapeHtml(project.acronym)}</div>
            </div>
            <span class="${getStatusBadgeClasses(project.status)}">${escapeHtml(project.status)}</span>
          </header>
          <dl class="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
            <div>
              <dt class="text-xs font-semibold uppercase tracking-wide text-slate-400">Role</dt>
              <dd class="mt-1 font-medium text-slate-800">${escapeHtml(project.role)}</dd>
            </div>
            <div>
              <dt class="text-xs font-semibold uppercase tracking-wide text-slate-400">Timeline</dt>
              <dd class="mt-1">${timeline}</dd>
            </div>
            <div>
              <dt class="text-xs font-semibold uppercase tracking-wide text-slate-400">Mission zone</dt>
              <dd class="mt-1">${escapeHtml(project.missionZone)}</dd>
            </div>
            <div>
              <dt class="text-xs font-semibold uppercase tracking-wide text-slate-400">Funding</dt>
              <dd class="mt-1">${escapeHtml(project.funding)}</dd>
            </div>
          </dl>
          <div class="mt-4 flex flex-wrap gap-2">
            ${missionTags}
            ${objectiveTags}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderPartnerMissionTags(container, partner) {
  if (!container) return;
  const hasMissionData = partner.missionPillars.length || partner.missionObjectives.length || partner.technologyPillars.length;
  if (!hasMissionData) {
    container.innerHTML =
      '<p class="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">Mission alignment tags will surface once the partner is linked to projects.</p>';
    return;
  }

  container.innerHTML = `
    <div class="space-y-4">
      <div>
        <h2 class="text-xs font-semibold uppercase tracking-wide text-slate-500">Mission pillars</h2>
        <div class="mt-2 flex flex-wrap gap-2">${renderTagGroup(partner.missionPillars, "bg-slate-100 text-slate-700")}</div>
      </div>
      <div>
        <h2 class="text-xs font-semibold uppercase tracking-wide text-slate-500">Mission objectives</h2>
        <div class="mt-2 flex flex-wrap gap-2">${renderTagGroup(partner.missionObjectives, "bg-blue-50 text-blue-700")}</div>
      </div>
      <div>
        <h2 class="text-xs font-semibold uppercase tracking-wide text-slate-500">Technology pillars</h2>
        <div class="mt-2 flex flex-wrap gap-2">${renderTagGroup(partner.technologyPillars, "bg-emerald-50 text-emerald-700")}</div>
      </div>
    </div>
  `;
}

function renderPartnerChart(partner) {
  const canvas = document.getElementById("partnerPillarChart");
  if (!canvas) return;

  const counts = partner.missionPillars.reduce((acc, pillar) => {
    const value = partner.projects.reduce((count, project) => (project.missionPillars.includes(pillar) ? count + 1 : count), 0);
    acc[pillar] = value;
    return acc;
  }, {});

  const labels = Object.keys(counts);
  const data = labels.map((label) => counts[label]);

  if (labels.length === 0) {
    canvas.parentElement.classList.add("hidden");
    return;
  }

  const palette = ["#0ea5e9", "#6366f1", "#14b8a6", "#f97316", "#f59e0b", "#ef4444"];

  new Chart(canvas, {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: labels.map((_, index) => palette[index % palette.length]),
          borderWidth: 1,
          borderColor: "#ffffff",
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          position: "bottom",
          labels: { boxWidth: 12, font: { size: 12 } },
        },
      },
    },
  });
}

/* -------------------------------------------------------------------------- */
/* Project detail                                                             */
/* -------------------------------------------------------------------------- */

function initProjectDetail(projects) {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");
  const project = projects.find((entry) => entry.id === projectId);

  const header = document.getElementById("projectHeader");
  const missionSection = document.getElementById("projectMission");
  const partnerSection = document.getElementById("projectPartners");
  const kpiSection = document.getElementById("projectKpis");
  const insightSection = document.getElementById("projectInsights");
  const notFound = document.getElementById("projectNotFound");

  if (!project || !header) {
    if (notFound) notFound.classList.remove("hidden");
    if (header) header.classList.add("hidden");
    return;
  }

  renderProjectHeader(header, project);
  renderProjectMission(missionSection, project);
  renderProjectPartners(partnerSection, project.partners);
  renderProjectKpis(kpiSection, project);
  renderProjectInsights(insightSection, project);
}

function renderProjectHeader(container, project) {
  const timeline = formatTimeline(project.startDate, project.endDate);
  container.innerHTML = `
    <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <div class="text-xs font-semibold uppercase tracking-[0.25em] text-blue-500">Mission Project</div>
        <h1 class="mt-2 text-3xl font-semibold text-slate-900">${escapeHtml(project.title)}</h1>
        <div class="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">${escapeHtml(project.acronym)}</span>
          <span class="text-slate-300">•</span>
          <span>${escapeHtml(project.id)}</span>
          <span class="text-slate-300">•</span>
          <span>${escapeHtml(project.missionZone)}</span>
        </div>
        <p class="mt-3 max-w-3xl text-sm text-slate-600">${escapeHtml(project.summary)}</p>
        <div class="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span class="${getStatusBadgeClasses(project.status)}">${escapeHtml(project.status)}</span>
          <span class="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">Lead: ${escapeHtml(project.leadPartner)}</span>
          <span class="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">${timeline}</span>
          <span class="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">${escapeHtml(project.funding)}</span>
        </div>
      </div>
      <div class="flex flex-col items-start gap-3 text-sm">
        <a href="index.html" class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-400 hover:text-blue-600">
          ← Back to explorer
        </a>
        ${
          project.website
            ? `<a href="${escapeAttribute(project.website)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700">
          Project website
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.5 6H18m0 0v4.5M18 6 9.75 14.25m0 0H6m3.75 0V18" />
          </svg>
        </a>`
            : ""
        }
      </div>
    </div>
    <section class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      ${renderStatCard("Budget", project.budget)}
      ${renderStatCard("EU contribution", project.comparison.euContribution)}
      ${renderStatCard("Duration (months)", project.comparison.durationMonths)}
      ${renderStatCard("Mission focus", project.comparison.missionZoneFocus)}
    </section>
  `;
}

function renderProjectMission(container, project) {
  if (!container) return;
  container.innerHTML = `
    <section class="space-y-4">
      <div>
        <h2 class="text-xs font-semibold uppercase tracking-wide text-slate-500">Mission pillars</h2>
        <div class="mt-2 flex flex-wrap gap-2">${renderTagGroup(project.missionPillars, "bg-slate-100 text-slate-700")}</div>
      </div>
      <div>
        <h2 class="text-xs font-semibold uppercase tracking-wide text-slate-500">Mission objectives</h2>
        <div class="mt-2 flex flex-wrap gap-2">${renderTagGroup(project.missionObjectives, "bg-blue-50 text-blue-700")}</div>
      </div>
      <div>
        <h2 class="text-xs font-semibold uppercase tracking-wide text-slate-500">Topic clusters</h2>
        <div class="mt-2 flex flex-wrap gap-2">${renderTagGroup(project.topicClusters, "bg-amber-50 text-amber-700")}</div>
      </div>
      <div>
        <h2 class="text-xs font-semibold uppercase tracking-wide text-slate-500">Technology pillars</h2>
        <div class="mt-2 flex flex-wrap gap-2">${renderTagGroup(project.technologyPillars, "bg-emerald-50 text-emerald-700")}</div>
      </div>
    </section>
  `;
}

function renderProjectPartners(container, partners) {
  if (!container) return;
  container.innerHTML = `
    <table class="min-w-full divide-y divide-slate-200">
      <thead>
        <tr class="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <th class="px-3 py-2">Organisation</th>
          <th class="px-3 py-2">Role</th>
          <th class="px-3 py-2">Country</th>
          <th class="px-3 py-2">Type</th>
          <th class="px-3 py-2">Website</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100 bg-white">
        ${partners
          .map(
            (partner) => `
          <tr>
            <td class="px-3 py-3 text-sm font-medium text-slate-800">${escapeHtml(partner.name)}</td>
            <td class="px-3 py-3 text-sm text-slate-600">${escapeHtml(partner.role)}</td>
            <td class="px-3 py-3 text-sm text-slate-600">${escapeHtml(partner.country)}</td>
            <td class="px-3 py-3 text-sm text-slate-600">${escapeHtml(partner.type)}</td>
            <td class="px-3 py-3 text-sm text-blue-600">
              ${
                partner.website
                  ? `<a href="${escapeAttribute(partner.website)}" target="_blank" rel="noopener noreferrer" class="hover:underline">Visit</a>`
                  : "—"
              }
            </td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderProjectKpis(container, project) {
  if (!container) return;
  const missionKpis = project.missionKpis || [];
  container.innerHTML = missionKpis.length
    ? `
    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      ${missionKpis.map((kpi) => `<div class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">${escapeHtml(kpi)}</div>`).join("")}
    </div>
  `
    : `<p class="text-sm text-slate-500">KPIs for this project will be published soon.</p>`;
}

function renderProjectInsights(container, project) {
  if (!container) return;
  const tech = project.insights?.technologyHighlights ?? [];
  const engagement = project.insights?.engagementActions ?? [];

  container.innerHTML = `
    <div class="grid gap-4 lg:grid-cols-2">
      <section class="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
        <h2 class="text-sm font-semibold text-blue-900">Technology Highlights</h2>
        <ul class="mt-3 space-y-2 text-sm text-blue-800">
          ${tech.map((item) => `<li class="flex gap-2"><span class="mt-1 h-2 min-w-[0.5rem] rounded-full bg-blue-400"></span><span>${escapeHtml(item)}</span></li>`).join("")}
        </ul>
      </section>
      <section class="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
        <h2 class="text-sm font-semibold text-emerald-900">Engagement Actions</h2>
        <ul class="mt-3 space-y-2 text-sm text-emerald-800">
          ${engagement
            .map((item) => `<li class="flex gap-2"><span class="mt-1 h-2 min-w-[0.5rem] rounded-full bg-emerald-400"></span><span>${escapeHtml(item)}</span></li>`)
            .join("")}
        </ul>
      </section>
    </div>
  `;
}

/* -------------------------------------------------------------------------- */
/* Filter UI                                                                  */
/* -------------------------------------------------------------------------- */

function setupFilterSystem(container, definitions, state, onChange) {
  container.innerHTML = "";
  const filterRefs = new Map();

  const closeAllPanels = () => {
    filterRefs.forEach(({ button, panel }) => {
      button.setAttribute("aria-expanded", "false");
      panel.classList.add("hidden");
    });
  };

  definitions.forEach((definition) => {
    const selectedSet = state[definition.id];
    if (!selectedSet) {
      state[definition.id] = new Set();
    }

    const wrapper = document.createElement("div");
    wrapper.className = "relative";

    const button = document.createElement("button");
    button.type = "button";
    button.dataset.filterId = definition.id;
    button.className =
      "filter-toggle inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-blue-400 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400";
    button.innerHTML = `<span>${escapeHtml(definition.label)}</span><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.584l3.71-3.354a.75.75 0 011.04 1.08l-4.25 3.845a.75.75 0 01-1.04 0L5.25 8.29a.75.75 0 01-.02-1.08z" clip-rule="evenodd"/></svg>`;
    button.setAttribute("aria-expanded", "false");

    const panel = document.createElement("div");
    panel.className =
      "filter-panel absolute z-30 mt-2 max-h-72 min-w-[220px] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 text-sm shadow-xl hidden";

    const checkboxes = [];
    definition.options.forEach((option) => {
      const checkboxId = `${definition.id}-${slugify(option)}`;
      const optionWrapper = document.createElement("label");
      optionWrapper.className = "flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-50";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = option;
      input.id = checkboxId;
      input.className = "h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500";
      if (selectedSet.has(option)) {
        input.checked = true;
      }

      input.addEventListener("change", () => {
        if (input.checked) {
          selectedSet.add(option);
        } else {
          selectedSet.delete(option);
        }
        updateButtonLabel(definition.id);
        onChange();
      });

      const span = document.createElement("span");
      span.textContent = option;

      optionWrapper.appendChild(input);
      optionWrapper.appendChild(span);
      panel.appendChild(optionWrapper);
      checkboxes.push(input);
    });

    wrapper.appendChild(button);
    wrapper.appendChild(panel);
    container.appendChild(wrapper);

    filterRefs.set(definition.id, {
      button,
      panel,
      checkboxes,
      label: definition.label,
    });

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const expanded = button.getAttribute("aria-expanded") === "true";
      closeAllPanels();
      if (!expanded) {
        button.setAttribute("aria-expanded", "true");
        panel.classList.remove("hidden");
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!container.contains(event.target)) {
      closeAllPanels();
    }
  });

  const updateButtonLabel = (filterId) => {
    const entry = filterRefs.get(filterId);
    if (!entry) return;
    const count = state[filterId]?.size ?? 0;
    entry.button.querySelector("span").textContent = count ? `${entry.label} · ${count}` : entry.label;
  };

  filterRefs.forEach((_value, key) => updateButtonLabel(key));

  return {
    resetAll() {
      filterRefs.forEach(({ checkboxes }, filterId) => {
        const set = state[filterId];
        if (set) set.clear();
        checkboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });
        updateButtonLabel(filterId);
      });
      closeAllPanels();
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Export helpers                                                             */
/* -------------------------------------------------------------------------- */

function exportProjectsToWorkbook(projects) {
  if (typeof XLSX === "undefined") {
    alert("SheetJS is not loaded. Export unavailable.");
    return;
  }

  const rows = projects.map((project) => ({
    ID: project.id,
    Title: project.title,
    Acronym: project.acronym,
    Status: project.status,
    "Start Date": project.startDate,
    "End Date": project.endDate,
    "Lead Partner": project.leadPartner,
    Country: project.leadCountry,
    "Mission Zone": project.missionZone,
    "Mission Pillars": project.missionPillars.join("; "),
    "Mission Objectives": project.missionObjectives.join("; "),
    "Topic Clusters": project.topicClusters.join("; "),
    "Technology Pillars": project.technologyPillars.join("; "),
    Budget: project.budget,
    Funding: project.funding,
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");
  XLSX.writeFile(workbook, "restoremed-projects.xlsx");
}

function exportPartnersToWorkbook(partners) {
  if (typeof XLSX === "undefined") {
    alert("SheetJS is not loaded. Export unavailable.");
    return;
  }

  const rows = partners.map((partner) => ({
    Name: partner.name,
    Acronym: partner.acronym,
    Country: partner.country,
    Type: partner.type,
    "Total Projects": partner.totalProjects,
    "Lead Roles": partner.leadCount,
    "Partner Roles": partner.partnerCount,
    "Mission Pillars": partner.missionPillars.join("; "),
    "Mission Objectives": partner.missionObjectives.join("; "),
    "Technology Pillars": partner.technologyPillars.join("; "),
    Website: partner.website ?? "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Partners");
  XLSX.writeFile(workbook, "restoremed-partners.xlsx");
}

/* -------------------------------------------------------------------------- */
/* Utilities                                                                  */
/* -------------------------------------------------------------------------- */

function matchesSearch(corpus, tokens) {
  if (!tokens || tokens.length === 0) return true;
  if (!corpus) return false;
  return tokens.every((token) => corpus.includes(token));
}

function matchesValue(value, selectedSet) {
  if (!selectedSet || selectedSet.size === 0) return true;
  return selectedSet.has(value);
}

function matchesArray(values, selectedSet) {
  if (!selectedSet || selectedSet.size === 0) return true;
  return values.some((value) => selectedSet.has(value));
}

function tokenize(value) {
  if (!value) return [];
  return normalizeText(value)
    .split(/\s+/)
    .filter(Boolean);
}

function normalizeText(value) {
  return value
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function slugify(value) {
  return value
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => fn(...args), delay);
  };
}

function sortAlpha(values) {
  return values.slice().sort((a, b) => a.localeCompare(b));
}

function renderTagGroup(values, classes) {
  if (!values || values.length === 0) return "";
  return values
    .map((value) => `<span class="inline-flex items-center rounded-full ${classes} px-3 py-1 text-xs font-semibold">${escapeHtml(value)}</span>`)
    .join("");
}

function renderInlineList(values) {
  if (!values || values.length === 0) return "—";
  return values.map((value) => `<span class="inline-block rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">${escapeHtml(value)}</span>`).join(" ");
}

function formatTimeline(start, end) {
  const startDate = formatDate(start);
  const endDate = formatDate(end);
  if (!startDate && !endDate) return "—";
  return [startDate || "TBC", "→", endDate || "TBC"].join(" ");
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" }).format(date);
}

function partnerSearchCorpus(partner) {
  return normalizeText(
    [
      partner.name,
      partner.acronym,
      partner.country,
      partner.type,
      partner.focus,
      (partner.specialties || []).join(" "),
      partner.missionPillars.join(" "),
      partner.missionObjectives.join(" "),
      partner.technologyPillars.join(" "),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function renderStatCard(label, value) {
  return `
    <div class="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">${escapeHtml(label)}</div>
      <div class="mt-1 text-lg font-semibold text-slate-900">${escapeHtml(value ?? "—")}</div>
    </div>
  `;
}

function getStatusBadgeClasses(status) {
  const base = "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";
  switch (status) {
    case "Active":
      return `${base} bg-emerald-100 text-emerald-700`;
    case "Ongoing":
      return `${base} bg-blue-100 text-blue-700`;
    case "Completed":
      return `${base} bg-slate-200 text-slate-700`;
    default:
      return `${base} bg-slate-100 text-slate-600`;
  }
}

function countValues(values) {
  const counter = new Map();
  values.forEach((value) => {
    if (!value) return;
    counter.set(value, (counter.get(value) || 0) + 1);
  });
  return Array.from(counter.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

function buildRoleSummary(leadCount, partnerCount) {
  const parts = [];
  if (leadCount > 0) parts.push(`${leadCount} lead`);
  if (partnerCount > 0) parts.push(`${partnerCount} partner`);
  return parts.length ? parts.join(" · ") : "—";
}
