const appState = {
  currentScene: 0,
  totalScenes: 3,
  selectedCountry: null,
  selectedYear: 2018,
  animationDuration: 1000,
  annotationDelay: 500
};

const dataStore = {
  countryRegionMap: new Map(),
  rawData: [],
  processedData: {
    gdpLifeExp: [],
    giniByRegion: [],
    lifeExpTrends: []
  }
};

// Region mapping function
function getRegionFromCountryCode(countryCode) {
  const regionMap = {
    // Europe & Central Asia
    'ALB': 'Europe & Central Asia', 'AND': 'Europe & Central Asia', 'ARM': 'Europe & Central Asia',
    'AUT': 'Europe & Central Asia', 'AZE': 'Europe & Central Asia', 'BLR': 'Europe & Central Asia',
    'BEL': 'Europe & Central Asia', 'BIH': 'Europe & Central Asia', 'BGR': 'Europe & Central Asia',
    'HRV': 'Europe & Central Asia', 'CZE': 'Europe & Central Asia', 'DNK': 'Europe & Central Asia',
    'EST': 'Europe & Central Asia', 'FIN': 'Europe & Central Asia', 'FRA': 'Europe & Central Asia',
    'GEO': 'Europe & Central Asia', 'DEU': 'Europe & Central Asia', 'GRC': 'Europe & Central Asia',
    'HUN': 'Europe & Central Asia', 'ISL': 'Europe & Central Asia', 'IRL': 'Europe & Central Asia',
    'ITA': 'Europe & Central Asia', 'KAZ': 'Europe & Central Asia', 'KGZ': 'Europe & Central Asia',
    'LVA': 'Europe & Central Asia', 'LTU': 'Europe & Central Asia', 'LUX': 'Europe & Central Asia',
    'MDA': 'Europe & Central Asia', 'MNE': 'Europe & Central Asia', 'NLD': 'Europe & Central Asia',
    'MKD': 'Europe & Central Asia', 'NOR': 'Europe & Central Asia', 'POL': 'Europe & Central Asia',
    'PRT': 'Europe & Central Asia', 'ROU': 'Europe & Central Asia', 'RUS': 'Europe & Central Asia',
    'SRB': 'Europe & Central Asia', 'SVK': 'Europe & Central Asia', 'SVN': 'Europe & Central Asia',
    'ESP': 'Europe & Central Asia', 'SWE': 'Europe & Central Asia', 'CHE': 'Europe & Central Asia',
    'TJK': 'Europe & Central Asia', 'TUR': 'Europe & Central Asia', 'TKM': 'Europe & Central Asia',
    'UKR': 'Europe & Central Asia', 'UZB': 'Europe & Central Asia',
    
    // East Asia & Pacific
    'AUS': 'East Asia & Pacific', 'BRN': 'East Asia & Pacific', 'KHM': 'East Asia & Pacific',
    'CHN': 'East Asia & Pacific', 'FJI': 'East Asia & Pacific', 'HKG': 'East Asia & Pacific',
    'IDN': 'East Asia & Pacific', 'JPN': 'East Asia & Pacific', 'KAZ': 'East Asia & Pacific',
    'KIR': 'East Asia & Pacific', 'LAO': 'East Asia & Pacific', 'MAC': 'East Asia & Pacific',
    'MYS': 'East Asia & Pacific', 'MNG': 'East Asia & Pacific', 'MMR': 'East Asia & Pacific',
    'NCL': 'East Asia & Pacific', 'NZL': 'East Asia & Pacific', 'PNG': 'East Asia & Pacific',
    'PHL': 'East Asia & Pacific', 'WSM': 'East Asia & Pacific', 'SGP': 'East Asia & Pacific',
    'SLB': 'East Asia & Pacific', 'KOR': 'East Asia & Pacific', 'THA': 'East Asia & Pacific',
    'TLS': 'East Asia & Pacific', 'TON': 'East Asia & Pacific', 'VUT': 'East Asia & Pacific',
    'VNM': 'East Asia & Pacific',
    
    // Latin America & Caribbean
    'ARG': 'Latin America & Caribbean', 'ATG': 'Latin America & Caribbean', 'BHS': 'Latin America & Caribbean',
    'BRB': 'Latin America & Caribbean', 'BLZ': 'Latin America & Caribbean', 'BOL': 'Latin America & Caribbean',
    'BRA': 'Latin America & Caribbean', 'CHL': 'Latin America & Caribbean', 'COL': 'Latin America & Caribbean',
    'CRI': 'Latin America & Caribbean', 'CUB': 'Latin America & Caribbean', 'DMA': 'Latin America & Caribbean',
    'DOM': 'Latin America & Caribbean', 'ECU': 'Latin America & Caribbean', 'SLV': 'Latin America & Caribbean',
    'GRD': 'Latin America & Caribbean', 'GTM': 'Latin America & Caribbean', 'GUY': 'Latin America & Caribbean',
    'HTI': 'Latin America & Caribbean', 'HND': 'Latin America & Caribbean', 'JAM': 'Latin America & Caribbean',
    'MEX': 'Latin America & Caribbean', 'NIC': 'Latin America & Caribbean', 'PAN': 'Latin America & Caribbean',
    'PRY': 'Latin America & Caribbean', 'PER': 'Latin America & Caribbean', 'KNA': 'Latin America & Caribbean',
    'LCA': 'Latin America & Caribbean', 'VCT': 'Latin America & Caribbean', 'SUR': 'Latin America & Caribbean',
    'TTO': 'Latin America & Caribbean', 'URY': 'Latin America & Caribbean', 'VEN': 'Latin America & Caribbean',
    
    // Middle East & North Africa
    'DZA': 'Middle East & North Africa', 'BHR': 'Middle East & North Africa', 'DJI': 'Middle East & North Africa',
    'EGY': 'Middle East & North Africa', 'IRN': 'Middle East & North Africa', 'IRQ': 'Middle East & North Africa',
    'ISR': 'Middle East & North Africa', 'JOR': 'Middle East & North Africa', 'LBN': 'Middle East & North Africa',
    'LBY': 'Middle East & North Africa', 'MAR': 'Middle East & North Africa', 'OMN': 'Middle East & North Africa',
    'PSE': 'Middle East & North Africa', 'QAT': 'Middle East & North Africa', 'SAU': 'Middle East & North Africa',
    'SYR': 'Middle East & North Africa', 'TUN': 'Middle East & North Africa', 'ARE': 'Middle East & North Africa',
    'YEM': 'Middle East & North Africa',
    
    // North America
    'CAN': 'North America', 'USA': 'North America',
    
    // South Asia
    'AFG': 'South Asia', 'BGD': 'South Asia', 'BTN': 'South Asia', 'IND': 'South Asia',
    'MDV': 'South Asia', 'NPL': 'South Asia', 'PAK': 'South Asia', 'LKA': 'South Asia',
    
         // Sub-Saharan Africa
     'AFE': 'Sub-Saharan Africa', 'AFW': 'Sub-Saharan Africa', 'AGO': 'Sub-Saharan Africa', 'BEN': 'Sub-Saharan Africa', 'BWA': 'Sub-Saharan Africa',
     'BFA': 'Sub-Saharan Africa', 'BDI': 'Sub-Saharan Africa', 'CMR': 'Sub-Saharan Africa',
     'CPV': 'Sub-Saharan Africa', 'CAF': 'Sub-Saharan Africa', 'TCD': 'Sub-Saharan Africa',
     'COM': 'Sub-Saharan Africa', 'COG': 'Sub-Saharan Africa', 'COD': 'Sub-Saharan Africa',
     'CIV': 'Sub-Saharan Africa', 'GNQ': 'Sub-Saharan Africa', 'ERI': 'Sub-Saharan Africa',
     'ETH': 'Sub-Saharan Africa', 'GAB': 'Sub-Saharan Africa', 'GMB': 'Sub-Saharan Africa',
     'GHA': 'Sub-Saharan Africa', 'GIN': 'Sub-Saharan Africa', 'GNB': 'Sub-Saharan Africa',
     'KEN': 'Sub-Saharan Africa', 'LSO': 'Sub-Saharan Africa', 'LBR': 'Sub-Saharan Africa',
     'MDG': 'Sub-Saharan Africa', 'MWI': 'Sub-Saharan Africa', 'MLI': 'Sub-Saharan Africa',
     'MRT': 'Sub-Saharan Africa', 'MUS': 'Sub-Saharan Africa', 'MOZ': 'Sub-Saharan Africa',
     'NAM': 'Sub-Saharan Africa', 'NER': 'Sub-Saharan Africa', 'NGA': 'Sub-Saharan Africa',
     'RWA': 'Sub-Saharan Africa', 'STP': 'Sub-Saharan Africa', 'SEN': 'Sub-Saharan Africa',
     'SYC': 'Sub-Saharan Africa', 'SLE': 'Sub-Saharan Africa', 'SOM': 'Sub-Saharan Africa',
     'ZAF': 'Sub-Saharan Africa', 'SSD': 'Sub-Saharan Africa', 'SDN': 'Sub-Saharan Africa',
     'SWZ': 'Sub-Saharan Africa', 'TZA': 'Sub-Saharan Africa', 'TGO': 'Sub-Saharan Africa',
     'UGA': 'Sub-Saharan Africa', 'ZMB': 'Sub-Saharan Africa', 'ZWE': 'Sub-Saharan Africa'
  };
  
  return regionMap[countryCode] || 'Other';
}

const chartConfig = {
  width: 1100,
  height: 800,
  margin: {top: 40, right: 150, bottom: 150, left: 100}
};

const colorPalettes = {
  regions: d3.scaleOrdinal().range(d3.schemeCategory10),
  incomeGroups: d3.scaleOrdinal().range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728"]),
  highlights: d3.scaleOrdinal().range(["#e41a1c", "#377eb8", "#4daf4a", "#984ea3"])
};

class SceneTemplate {
  constructor() {
    this.container = d3.select("#chart");
    this.navigationContainer = d3.select("body");
  }

  // Clear and setup scene container
  clearScene() {
    this.container.html("");
  }

  // Add consistent header
  addHeader(title, subtitle) {
    this.container
      .append("div")
      .attr("class", "scene-header")
      .style("text-align", "center")
      .style("margin-bottom", "10px")
      .html(`
        <h2 style="font-size: 24px; color: #2c3e50; margin-bottom: 5px; font-weight: 600;">${title}</h2>
        <p style="font-size: 14px; color: #7f8c8d; max-width: 800px; margin: 0 auto; line-height: 1.4;">${subtitle}</p>
      `);
  }

  // Add consistent SVG container
  createSVG() {
    return this.container
      .append("svg")
      .attr("width", chartConfig.width)
      .attr("height", chartConfig.height)
      .style("background-color", "#f8f9fa")
      .style("border-radius", "8px")
      .style("box-shadow", "0 2px 10px rgba(0,0,0,0.1)")
      .style("display", "block");
  }

  // Add consistent navigation
  addNavigation() {
    // Check if navigation already exists
    let nav = this.navigationContainer.select(".scene-navigation");
    
    if (nav.empty()) {
      // Create navigation for the first time
      nav = this.navigationContainer
        .append("div")
        .attr("class", "scene-navigation")
        .style("position", "fixed")
        .style("bottom", "20px")
        .style("right", "20px")
        .style("z-index", "1000")
        .style("background", "rgba(255, 255, 255, 0.9)")
        .style("padding", "8px 12px")
        .style("border-radius", "6px")
        .style("box-shadow", "0 2px 8px rgba(0,0,0,0.15)")
        .style("border", "1px solid #e0e0e0");

      nav.append("button")
        .attr("id", "prev")
        .text("←")
        .style("margin-right", "6px")
        .style("padding", "6px 10px")
        .style("background", appState.currentScene === 0 ? "#bdc3c7" : "#3498db")
        .style("color", "white")
        .style("border", "none")
        .style("border-radius", "4px")
        .style("cursor", appState.currentScene === 0 ? "not-allowed" : "pointer")
        .style("font-size", "12px")
        .style("font-weight", "bold");

      nav.append("span")
        .attr("id", "scene-counter")
        .text(`${appState.currentScene + 1}/${appState.totalScenes}`)
        .style("margin", "0 8px")
        .style("color", "#495057")
        .style("font-weight", "500")
        .style("font-size", "11px");

      nav.append("button")
        .attr("id", "next")
        .text("→")
        .style("margin-left", "6px")
        .style("padding", "6px 10px")
        .style("background", appState.currentScene === appState.totalScenes - 1 ? "#bdc3c7" : "#3498db")
        .style("color", "white")
        .style("border", "none")
        .style("border-radius", "4px")
        .style("cursor", appState.currentScene === appState.totalScenes - 1 ? "not-allowed" : "pointer")
        .style("font-size", "12px")
        .style("font-weight", "bold");
    } else {
      nav.select("#prev")
        .style("background", appState.currentScene === 0 ? "#bdc3c7" : "#3498db")
        .style("cursor", appState.currentScene === 0 ? "not-allowed" : "pointer");

      nav.select("#scene-counter")
        .text(`${appState.currentScene + 1}/${appState.totalScenes}`);

      nav.select("#next")
        .style("background", appState.currentScene === appState.totalScenes - 1 ? "#bdc3c7" : "#3498db")
        .style("cursor", appState.currentScene === appState.totalScenes - 1 ? "not-allowed" : "pointer");
    }
  }

  // Add year selector to navigation area
  addYearSelector(template, ...indicators) {
    // Check if year selector already exists
    let yearSelector = this.navigationContainer.select(".year-selector");
    
    if (yearSelector.empty()) {
      // Create year selector for the first time
      yearSelector = this.navigationContainer
        .append("div")
        .attr("class", "year-selector")
        .style("position", "fixed")
        .style("top", "20px")
        .style("left", "20px")
        .style("z-index", "1000")
        .style("background", "rgba(255, 255, 255, 0.9)")
        .style("padding", "8px 12px")
        .style("border-radius", "6px")
        .style("box-shadow", "0 2px 8px rgba(0,0,0,0.15)")
        .style("border", "1px solid #e0e0e0");

      yearSelector.append("label")
        .text("Year: ")
        .style("margin-right", "8px")
        .style("font-weight", "500")
        .style("color", "#495057")
        .style("font-size", "12px");

      // Get available years based on indicators
      let availableYears = [];
      if (indicators.length === 1 && indicators[0] === "Gini index") {
        // For Gini index, only include years with actual values
        availableYears = Array.from(new Set(
          dataStore.rawData
            .filter(d => d.indicator === "Gini index" && !isNaN(d.value) && d.value > 0 && d.year >= 2005 && d.year <= 2020)
            .map(d => d.year)
        )).sort((a, b) => b - a);
      } else {
        const gdpYears = Array.from(new Set(
          dataStore.rawData
            .filter(d => d.indicator === "GDP per capita (current US$)" && !isNaN(d.value) && d.year >= 2005 && d.year <= 2020)
            .map(d => d.year)
        )).sort((a, b) => b - a);

        const lifeExpYears = Array.from(new Set(
          dataStore.rawData
            .filter(d => (d.indicator === "Life expectancy at birth, total (years)" || d.indicator === "Life expectancy at birth total (years)") && !isNaN(d.value) && d.year >= 2005 && d.year <= 2020)
            .map(d => d.year)
        )).sort((a, b) => b - a);

        availableYears = gdpYears.filter(year => lifeExpYears.includes(year));
      }

      const yearDropdown = yearSelector.append("select")
        .attr("id", "yearDropdown")
        .style("padding", "4px 8px")
        .style("border-radius", "4px")
        .style("border", "1px solid #ced4da")
        .style("font-size", "12px")
        .style("background", "white");

      yearDropdown.selectAll("option")
        .data(availableYears)
        .enter()
        .append("option")
        .text(d => d)
        .attr("value", d => d);

      // Set initial year
      yearDropdown.property("value", appState.selectedYear);
    }
  }
}

// ============================================================================
// ANNOTATION SYSTEM
// ============================================================================

class AnnotationSystem {
  constructor(svg) {
    this.svg = svg;
    this.annotations = [];
  }

  // Add persistent annotation

  // Add animated annotation that appears after delay

  // Add annotation without bubble (just text and line)
  addAnnotationNoBubble(data, position, text, highlight = false, customStyle = null, allowOverflow = false) {
    const chartWidth = chartConfig.width - chartConfig.margin.left - chartConfig.margin.right;
    const chartHeight = chartConfig.height - chartConfig.margin.top - chartConfig.margin.bottom;
    
    // Adjust position to stay within bounds
    let adjustedX = position.x;
    let adjustedY = position.y;
    
    // Keep annotation within chart bounds (with optional overflow for specific scenes)
    const maxOverflow = allowOverflow ? 600 : 0;
    if (adjustedX + 140 > chartWidth + maxOverflow) {
      adjustedX = chartWidth - 160;
    }
    if (adjustedX < 10) {
      adjustedX = 10;
    }
    if (adjustedY + 40 > chartHeight) {
      adjustedY = chartHeight - 50;
    }
    if (adjustedY < 10) {
      adjustedY = 10;
    }

    const annotation = this.svg.append("g")
      .attr("class", "annotation")
      .attr("transform", `translate(${adjustedX + chartConfig.margin.left}, ${adjustedY + chartConfig.margin.top})`);

    // Annotation text only (no bubble)
    const textElement = annotation.append("text")
      .attr("class", "annotation-text")
      .attr("x", 0)
      .attr("y", 0)
      .text(text)
      .style("font-size", customStyle ? customStyle.fontSize || "11px" : "11px")
      .style("fill", customStyle ? customStyle.color || (highlight ? "#856404" : "#495057") : (highlight ? "#856404" : "#495057"))
      .style("font-weight", customStyle ? customStyle.fontWeight || (highlight ? "600" : "400") : (highlight ? "600" : "400"));

    // Connecting line to data point - always visible
    if (data) {
      const lineX = data.x - adjustedX;
      const lineY = data.y - adjustedY;
      
      // For Scene 2, draw line directly to data point without offset
      if (allowOverflow) {
        annotation.append("line")
          .attr("class", "annotation-line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", lineX)
          .attr("y2", lineY)
          .attr("stroke", highlight ? "#ffc107" : "#6c757d")
          .attr("stroke-width", highlight ? 1.5 : 0.8)
          .attr("stroke-dasharray", "2,2")
          .style("opacity", 0.6);
      } else {
        // For other scenes, use original logic
        annotation.append("line")
          .attr("class", "annotation-line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", lineX)
          .attr("y2", lineY)
          .attr("stroke", highlight ? "#ffc107" : "#6c757d")
          .attr("stroke-width", highlight ? 1.5 : 0.8)
          .attr("stroke-dasharray", "2,2")
          .style("opacity", 0.6);
      }
    }

    this.annotations.push(annotation);
    return annotation;
  }

  // Add animated annotation without bubble that appears after delay
  addDelayedAnnotationNoBubble(data, position, text, delay, highlight = false, customStyle = null, allowOverflow = false) {
    setTimeout(() => {
      this.addAnnotationNoBubble(data, position, text, highlight, customStyle, allowOverflow);
    }, delay);
  }

  // Clear all annotations
  clear() {
    this.svg.selectAll(".annotation").remove();
    this.annotations = [];
  }
}

// ============================================================================
// TRIGGER SYSTEM
// ============================================================================

class TriggerSystem {
  constructor() {
    this.setupNavigationTriggers();
    this.setupInteractionTriggers();
  }

  setupNavigationTriggers() {
    document.addEventListener('click', (event) => {
      if (event.target && event.target.id === 'next') {
        if (appState.currentScene < appState.totalScenes - 1) {
          this.changeScene(appState.currentScene + 1);
        }
      } else if (event.target && event.target.id === 'prev') {
        if (appState.currentScene > 0) {
          this.changeScene(appState.currentScene - 1);
        }
      }
    });
  }

  setupInteractionTriggers() {
    document.addEventListener('change', function(event) {
      if (event.target && event.target.id === 'countryDropdown') {
        appState.selectedCountry = event.target.value;
        
        if (appState.currentScene === 2) {
          renderScene(appState.currentScene);
        }
      }
      
      if (event.target && event.target.id === 'yearDropdown') {
        appState.selectedYear = parseInt(event.target.value);
        
        processData();
        renderScene(appState.currentScene);
        
        d3.select("body").select("#yearDropdown").property("value", appState.selectedYear);
      }
    });
  }

  changeScene(newScene) {
    appState.currentScene = newScene;
    
    d3.select("body").select(".year-selector").remove();
    
    renderScene(newScene);
    this.updateNavigationState();
  }

  updateNavigationState() {
    const nav = d3.select("body").select(".scene-navigation");
    if (!nav.empty()) {
      nav.select("#prev")
        .style("background", appState.currentScene === 0 ? "#bdc3c7" : "#3498db")
        .style("cursor", appState.currentScene === 0 ? "not-allowed" : "pointer");

      nav.select("#scene-counter")
        .text(`${appState.currentScene + 1}/${appState.totalScenes}`);

      nav.select("#next")
        .style("background", appState.currentScene === appState.totalScenes - 1 ? "#bdc3c7" : "#3498db")
        .style("cursor", appState.currentScene === appState.totalScenes - 1 ? "not-allowed" : "pointer");
    }
  }
}

// ============================================================================
// DATA PROCESSING
// ============================================================================

function processData() {
  // Process GDP vs Life Expectancy data
  const gdpData = dataStore.rawData.filter(d => 
    d.year === appState.selectedYear && 
    d.indicator === "GDP per capita (current US$)"
  );
  const lifeExpData = dataStore.rawData.filter(d => 
    d.year === appState.selectedYear && 
    (d.indicator === "Life expectancy at birth, total (years)" || d.indicator === "Life expectancy at birth total (years)")
  );

  dataStore.processedData.gdpLifeExp = [];
  gdpData.forEach(g => {
    const life = lifeExpData.find(l => l.country === g.country);
    if (life && g.value > 0 && !isNaN(g.value) && !isNaN(life.value)) {
      dataStore.processedData.gdpLifeExp.push({
        country: g.country,
        region: g.region,
        gdp: g.value,
        lifeExp: life.value
      });
    }
  });

  const giniData = dataStore.rawData.filter(d =>
    d.indicator === "Gini index" &&
    d.year === appState.selectedYear &&
    !isNaN(d.value) &&
    d.value > 0
  );




  dataStore.processedData.giniByRegion = Array.from(
    d3.rollup(
      giniData,
      v => d3.mean(v, d => d.value / 100),
      d => d.region
    ),
    ([region, avgGini]) => ({region, avgGini})
  ).sort((a, b) => b.avgGini - a.avgGini);

  dataStore.processedData.giniYear = appState.selectedYear;

  const incomeGroups = ["Low income", "Lower middle income", "Upper middle income", "High income"];
  dataStore.processedData.lifeExpTrends = {
    incomeGroups: incomeGroups,
    countries: Array.from(new Set(dataStore.rawData.map(d => d.country))).sort()
  };
}

// Scene rendering functions

function renderScene(sceneIndex) {
  const template = new SceneTemplate();
  template.clearScene();

  try {
    switch(sceneIndex) {
      case 0:
        renderScene0(template);
        break;
      case 1:
        renderScene1(template);
        break;
      case 2:
        renderScene2(template);
        break;
      default:
        break;
    }

    template.addNavigation();
  } catch (error) {
    // Error handling
  }
}

function renderScene0(template) {
  template.addHeader(
    "The Wealth-Health Connection",
    "How GDP per capita relates to life expectancy across countries. Each point represents a country, with size indicating population and color showing region."
  );

  template.addYearSelector(template, "GDP per capita (current US$)", "Life expectancy at birth, total (years)");

  const svg = template.createSVG();
  const chart = svg.append("g")
    .attr("transform", `translate(${chartConfig.margin.left}, ${chartConfig.margin.top})`);

  const chartWidth = chartConfig.width - chartConfig.margin.left - chartConfig.margin.right;
  const chartHeight = chartConfig.height - chartConfig.margin.top - chartConfig.margin.bottom;

  const xScale = d3.scaleLog()
    .domain(d3.extent(dataStore.processedData.gdpLifeExp, d => d.gdp))
    .range([0, chartWidth]);

  const yScale = d3.scaleLinear()
    .domain([d3.min(dataStore.processedData.gdpLifeExp, d => d.lifeExp) - 5, 
             d3.max(dataStore.processedData.gdpLifeExp, d => d.lifeExp) + 5])
    .range([chartHeight, 0]);

  const regions = Array.from(new Set(dataStore.processedData.gdpLifeExp.map(d => d.region))).sort();
  colorPalettes.regions.domain(regions);

  // Axes
  const xAxis = d3.axisBottom(xScale).ticks(10, "~s");
  const yAxis = d3.axisLeft(yScale);

  chart.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis)
    .selectAll("text")
    .style("font-size", "10px")
    .style("fill", "#495057")
    .attr("dy", "1em")
    .style("text-anchor", "middle");

  chart.append("g")
    .attr("class", "axis")
    .call(yAxis)
    .selectAll("text")
    .style("font-size", "12px")
    .style("fill", "#495057");

  chart.append("text")
    .attr("x", chartWidth / 2)
    .attr("y", chartHeight + 40)
    .attr("text-anchor", "middle")
    .text("GDP per capita (log scale, current US$)")
    .style("font-size", "12px")
    .style("fill", "#495057");

  chart.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -chartHeight / 2)
    .attr("y", -40)
    .attr("text-anchor", "middle")
    .text("Life Expectancy (years)")
    .style("font-size", "11px")
    .style("fill", "#495057");

  const circles = chart.selectAll("circle")
    .data(dataStore.processedData.gdpLifeExp)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.gdp))
    .attr("cy", d => yScale(d.lifeExp))
    .attr("r", 0)
    .attr("fill", d => colorPalettes.regions(d.region))
    .attr("opacity", 0.7)
    .attr("stroke", "#fff")
    .attr("stroke-width", 1)
    .on("mouseover", function(event, d) {
      d3.select(this).attr("opacity", 1).attr("r", 8);
      showTooltip(event, d);
    })
    .on("mouseout", function() {
      d3.select(this).attr("opacity", 0.7).attr("r", 5);
      hideTooltip();
    })
    .transition()
    .duration(appState.animationDuration)
    .attr("r", 5);

  const legend = chart.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${chartWidth - 140}, ${chartHeight * 0.6})`);

  regions.forEach((region, i) => {
    const g = legend.append("g")
      .attr("transform", `translate(0, ${i * 20})`);

    g.append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", colorPalettes.regions(region));

    g.append("text")
      .attr("x", 16)
      .attr("y", 10)
      .text(region)
      .style("font-size", "11px")
      .style("fill", "#495057");
  });

  const annotationSystem = new AnnotationSystem(svg);
  
  const highestGDP = dataStore.processedData.gdpLifeExp.reduce((max, d) => d.gdp > max.gdp ? d : max);
  const lowestGDP = dataStore.processedData.gdpLifeExp.reduce((min, d) => d.gdp < min.gdp ? d : min);
  const lowestLifeExp = dataStore.processedData.gdpLifeExp.reduce((min, d) => d.lifeExp < min.lifeExp ? d : min);
  const highestLifeExp = dataStore.processedData.gdpLifeExp.reduce((max, d) => d.lifeExp > max.lifeExp ? d : max);
  
  annotationSystem.addDelayedAnnotationNoBubble(
    {x: xScale(highestGDP.gdp), y: yScale(highestGDP.lifeExp)},
    {x: xScale(highestGDP.gdp) + 150, y: yScale(highestGDP.lifeExp) - 120},
    `Highest GDP: ${highestGDP.country}`,
    appState.annotationDelay,
    true
  );

  annotationSystem.addDelayedAnnotationNoBubble(
    {x: xScale(lowestGDP.gdp), y: yScale(lowestGDP.lifeExp)},
    {x: xScale(lowestGDP.gdp) - 120, y: yScale(lowestGDP.lifeExp) - 120},
    `Lowest GDP: ${lowestGDP.country}`,
    appState.annotationDelay * 2,
    true
  );

  annotationSystem.addDelayedAnnotationNoBubble(
    {x: xScale(lowestLifeExp.gdp), y: yScale(lowestLifeExp.lifeExp)},
    {x: xScale(lowestLifeExp.gdp) - 120, y: yScale(lowestLifeExp.lifeExp) + 100},
    `Lowest Life Exp: ${lowestLifeExp.country}`,
    appState.annotationDelay * 3,
    true
  );

  annotationSystem.addDelayedAnnotationNoBubble(
    {x: xScale(highestLifeExp.gdp), y: yScale(highestLifeExp.lifeExp)},
    {x: xScale(highestLifeExp.gdp) + 150, y: yScale(highestLifeExp.lifeExp) + 150},
    `Highest Life Exp: ${highestLifeExp.country}`,
    appState.annotationDelay * 4,
    true
  );
}

function renderScene1(template) {
  template.addHeader(
    "Income Inequality Across Regions",
    "Average Gini Index by region (0-1 scale). Higher values indicate greater income inequality. This reveals which regions face the biggest economic disparities."
  );

  template.addYearSelector(template, "Gini index");

  const svg = template.createSVG();
  const chart = svg.append("g")
    .attr("transform", `translate(${chartConfig.margin.left}, ${chartConfig.margin.top - 20})`);

  const chartWidth = chartConfig.width - chartConfig.margin.left - chartConfig.margin.right;
  const chartHeight = chartConfig.height - chartConfig.margin.top - chartConfig.margin.bottom - 120;

  const giniData = dataStore.rawData.filter(d =>
    d.indicator === "Gini index" &&
    d.year === appState.selectedYear &&
    !isNaN(d.value) &&
    d.value > 0
  );

  const xScale = d3.scaleBand()
    .domain(dataStore.processedData.giniByRegion.map(d => d.region))
    .range([0, chartWidth])
    .padding(0.2);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataStore.processedData.giniByRegion, d => d.avgGini) * 1.1])
    .range([chartHeight, 0]);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  chart.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end")
    .style("font-size", "9px")
    .style("fill", "#495057")
    .attr("dy", "8em");

  chart.append("g")
    .attr("class", "axis")
    .call(yAxis)
    .selectAll("text")
    .style("font-size", "12px")
    .style("fill", "#495057");

  // Axis labels
  chart.append("text")
    .attr("x", chartWidth / 2)
    .attr("y", chartHeight + 140)
    .attr("text-anchor", "middle")
    .text("Region")
    .style("font-size", "14px")
    .style("fill", "#495057");

  chart.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -chartHeight / 2)
    .attr("y", -60)
    .attr("text-anchor", "middle")
    .text(`Average Gini Index (0-1 scale, ${appState.selectedYear})`)
    .style("font-size", "14px")
    .style("fill", "#495057");

  chart.selectAll(".bar")
    .data(dataStore.processedData.giniByRegion)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.region))
    .attr("width", xScale.bandwidth())
    .attr("y", chartHeight)
    .attr("height", 0)
    .attr("fill", "#e74c3c")
    .attr("opacity", 0.8)
    .on("mouseover", function(event, d) {
      d3.select(this).attr("opacity", 1);
      showTooltip(event, d);
    })
    .on("mouseout", function() {
      d3.select(this).attr("opacity", 0.8);
      hideTooltip();
    })
    .transition()
    .duration(appState.animationDuration)
    .attr("y", d => yScale(d.avgGini))
    .attr("height", d => chartHeight - yScale(d.avgGini));

  const totalCountries = giniData.length;
  const totalRegions = dataStore.processedData.giniByRegion.length;
  
  chart.append("text")
    .attr("x", 10)
    .attr("y", -10)
    .text(`Note: Data available for ${totalCountries} countries across ${totalRegions} regions in ${appState.selectedYear}`)
    .style("font-size", "10px")
    .style("fill", "#6c757d")
    .style("font-style", "italic");

  const annotationSystem = new AnnotationSystem(svg);
  
  const highestInequality = dataStore.processedData.giniByRegion[0];
  const lowestInequality = dataStore.processedData.giniByRegion[dataStore.processedData.giniByRegion.length - 1];

  annotationSystem.addDelayedAnnotationNoBubble(
    {x: xScale(highestInequality.region) + xScale.bandwidth() / 2, y: yScale(highestInequality.avgGini)},
    {x: xScale(highestInequality.region) + xScale.bandwidth() / 2, y: yScale(highestInequality.avgGini) - 50},
    `Highest inequality: ${highestInequality.region}`,
    appState.annotationDelay,
    true
  );

  annotationSystem.addDelayedAnnotationNoBubble(
    {x: xScale(lowestInequality.region) + xScale.bandwidth() / 2, y: yScale(lowestInequality.avgGini)},
    {x: xScale(lowestInequality.region) + xScale.bandwidth() / 2, y: yScale(lowestInequality.avgGini) - 50},
    `Lowest inequality: ${lowestInequality.region}`,
    appState.annotationDelay * 2,
    true
  );
}

function renderScene2(template) {
  template.addHeader(
    "Life Expectancy Trends Over Time",
    "Explore how life expectancy has changed over time for different countries. Select a country to see its trajectory compared to global trends."
  );

  const selectorContainer = template.container
    .append("div")
    .style("text-align", "center")
    .style("margin-bottom", "20px");

  selectorContainer.append("label")
    .text("Select Country: ")
    .style("margin-right", "10px")
    .style("font-weight", "500")
    .style("color", "#495057");

  const countriesWithLifeExp = Array.from(new Set(
    dataStore.rawData
      .filter(d => d.indicator === "Life expectancy at birth, total (years)" || d.indicator === "Life expectancy at birth total (years)")
      .map(d => d.country)
  )).sort();

  const countrySelector = selectorContainer.append("select")
    .attr("id", "countryDropdown")
    .style("padding", "5px 10px")
    .style("border-radius", "4px")
    .style("border", "1px solid #ced4da")
    .style("font-size", "14px");

  countrySelector.selectAll("option")
    .data(countriesWithLifeExp)
    .enter()
    .append("option")
    .text(d => d)
    .attr("value", d => d);

  if (!appState.selectedCountry || !countriesWithLifeExp.includes(appState.selectedCountry)) {
    appState.selectedCountry = countriesWithLifeExp[0];
  }
  countrySelector.property("value", appState.selectedCountry);

  const svg = template.createSVG();
  const chart = svg.append("g")
    .attr("transform", `translate(${chartConfig.margin.left}, ${chartConfig.margin.top - 20})`);

  const chartWidth = chartConfig.width - chartConfig.margin.left - chartConfig.margin.right;
  const chartHeight = chartConfig.height - chartConfig.margin.top - chartConfig.margin.bottom - 40;

  updateTrendChart(chart, chartWidth, chartHeight);
}

function updateTrendChart(chart, chartWidth, chartHeight) {
  chart.selectAll(".line, .axis, .axis-label, .legend, .legend-item, .point").remove();

  // Filter data for life expectancy
  const filteredData = dataStore.rawData.filter(d =>
    d.indicator === "Life expectancy at birth, total (years)" &&
    d.country === appState.selectedCountry &&
    d.year <= 2018 &&
    !isNaN(d.value)
  );

  const globalData = dataStore.rawData.filter(d =>
    d.indicator === "Life expectancy at birth, total (years)" &&
    d.year <= 2018 &&
    !isNaN(d.value)
  );

  // Calculate global average by year
  const globalAverages = Array.from(
    d3.rollup(
      globalData,
      v => d3.mean(v, d => d.value),
      d => d.year
    ),
    ([year, avg]) => ({ year, value: avg })
  ).sort((a, b) => a.year - b.year);

  const selectedCountryRegion = dataStore.rawData.find(d => 
    d.country === appState.selectedCountry && 
    (d.indicator === "Life expectancy at birth, total (years)" || d.indicator === "Life expectancy at birth total (years)")
  )?.region;

  const regionalData = dataStore.rawData.filter(d =>
    (d.indicator === "Life expectancy at birth, total (years)" || d.indicator === "Life expectancy at birth total (years)") &&
    d.region === selectedCountryRegion &&
    d.year <= 2018 &&
    !isNaN(d.value)
  );

  // Calculate regional average by year
  const regionalAverages = Array.from(
    d3.rollup(
      regionalData,
      v => d3.mean(v, d => d.value),
      d => d.year
    ),
    ([year, avg]) => ({ year, value: avg })
  ).sort((a, b) => a.year - b.year);

  const highIncomeCountries = ["United States", "Canada", "United Kingdom", "Germany", "France", "Japan", "Australia"];
  const highIncomeData = dataStore.rawData.filter(d =>
    (d.indicator === "Life expectancy at birth, total (years)" || d.indicator === "Life expectancy at birth total (years)") &&
    highIncomeCountries.includes(d.country) &&
    d.year <= 2018 &&
    !isNaN(d.value)
  );

  const highIncomeAverages = Array.from(
    d3.rollup(
      highIncomeData,
      v => d3.mean(v, d => d.value),
      d => d.year
    ),
    ([year, avg]) => ({ year, value: avg })
  ).sort((a, b) => a.year - b.year);

  // Prepare line data
  const selectedCountryData = filteredData.sort((a, b) => a.year - b.year);
  
  const lineData = [
    {
      name: appState.selectedCountry,
      values: selectedCountryData,
      type: "country"
    },
    {
      name: "Global Average",
      values: globalAverages,
      type: "global"
    },
    {
      name: `${selectedCountryRegion} Average`,
      values: regionalAverages,
      type: "regional"
    },
    {
      name: "High-Income Countries Average",
      values: highIncomeAverages,
      type: "high-income"
    }
  ];

  // Check if we have data
  if (selectedCountryData.length === 0) {
    chart.append("text")
      .attr("x", chartWidth / 2)
      .attr("y", chartHeight / 2)
      .attr("text-anchor", "middle")
      .text("No data available for selected country")
      .style("font-size", "16px")
      .style("fill", "#6c757d");
    return;
  }

  const allYears = Array.from(new Set([
    ...selectedCountryData.map(d => d.year),
    ...globalAverages.map(d => d.year),
    ...regionalAverages.map(d => d.year),
    ...highIncomeAverages.map(d => d.year)
  ])).sort((a, b) => a - b);

  const xScale = d3.scaleLinear()
    .domain(d3.extent(allYears))
    .range([0, chartWidth]);

  const allValues = [
    ...selectedCountryData.map(d => d.value),
    ...globalAverages.map(d => d.value),
    ...regionalAverages.map(d => d.value),
    ...highIncomeAverages.map(d => d.value)
  ].filter(v => !isNaN(v));

  const yScale = d3.scaleLinear()
    .domain([d3.min(allValues) - 2, d3.max(allValues) + 2])
    .range([chartHeight, 0]);

  const color = d3.scaleOrdinal()
    .domain([appState.selectedCountry, "Global Average", `${selectedCountryRegion} Average`, "High-Income Countries Average"])
    .range(["#e74c3c", "#3498db", "#2ecc71", "#f39c12"]);

  const line = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.value));

  chart.selectAll(".line")
    .data(lineData)
    .enter()
    .append("path")
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", d => color(d.name))
    .attr("stroke-width", d => d.type === "country" ? 4 : 2)
    .attr("stroke-dasharray", d => d.type === "country" ? "none" : "5,5")
    .attr("d", d => line(d.values))
    .style("opacity", 0)
    .transition()
    .duration(appState.animationDuration)
    .style("opacity", 1);

  chart.selectAll(".point")
    .data(selectedCountryData)
    .enter()
    .append("circle")
    .attr("class", "point")
    .attr("cx", d => xScale(d.year))
    .attr("cy", d => yScale(d.value))
    .attr("r", 0)
    .attr("fill", color(appState.selectedCountry))
    .attr("stroke", "#fff")
    .attr("stroke-width", 2)
    .on("mouseover", function(event, d) {
      d3.select(this).attr("r", 6);
      showTooltip(event, {
        country: appState.selectedCountry,
        year: d.year,
        value: d.value
      });
    })
    .on("mouseout", function() {
      d3.select(this).attr("r", 4);
      hideTooltip();
    })
    .transition()
    .duration(appState.animationDuration)
    .delay((d, i) => i * 100)
    .attr("r", 4);

  // Axes
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  const yAxis = d3.axisLeft(yScale);

  chart.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis)
    .selectAll("text")
    .style("font-size", "12px")
    .style("fill", "#495057");

  chart.append("g")
    .attr("class", "axis")
    .call(yAxis)
    .selectAll("text")
    .style("font-size", "12px")
    .style("fill", "#495057");

  // Axis labels
  chart.append("text")
    .attr("class", "axis-label")
    .attr("x", chartWidth / 2)
    .attr("y", chartHeight + 40)
    .attr("text-anchor", "middle")
    .text("Year")
    .style("font-size", "14px")
    .style("fill", "#495057");

  chart.append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -chartHeight / 2)
    .attr("y", -50)
    .attr("text-anchor", "middle")
    .text("Life Expectancy (years)")
    .style("font-size", "14px")
    .style("fill", "#495057");

  // Legend
  const legend = chart.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${chartWidth - 200}, ${chartHeight - 120})`);

  lineData.forEach((d, i) => {
    const g = legend.append("g")
      .attr("class", "legend-item")
      .attr("transform", `translate(0, ${i * 25})`);

    g.append("line")
      .attr("x1", 0)
      .attr("x2", 15)
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("stroke", color(d.name))
      .attr("stroke-width", d.type === "country" ? 3 : 2)
      .attr("stroke-dasharray", d.type === "country" ? "none" : "3,3");

    g.append("text")
      .attr("x", 20)
      .attr("y", 4)
      .text(d.name)
      .style("font-size", "11px")
      .style("fill", "#495057")
      .style("font-weight", d.type === "country" ? "600" : "400");
  });

  // Annotations
  const annotationSystem = new AnnotationSystem(d3.select("#chart svg"));
  
  if (selectedCountryData.length > 0) {
    const latestData = selectedCountryData[selectedCountryData.length - 1];
    const startData = selectedCountryData[0];
    
    // Calculate improvement
    const improvement = latestData.value - startData.value;
    const yearsSpan = latestData.year - startData.year;
    
    annotationSystem.addDelayedAnnotationNoBubble(
      {x: xScale(latestData.year), y: yScale(latestData.value)},
      {x: chartWidth - 50, y: yScale(latestData.value)},
      `${latestData.value.toFixed(1)} years (${latestData.year})`,
      appState.annotationDelay,
      false,
      null,
      true
    );

    annotationSystem.addDelayedAnnotationNoBubble(
      {x: xScale(startData.year), y: yScale(startData.value)},
      {x: xScale(startData.year) - 120, y: yScale(startData.value)},
      `${startData.value.toFixed(1)} years (${startData.year})`,
      appState.annotationDelay * 2,
      false,
      null,
      true
    );

    // Add improvement annotation
    if (improvement > 0) {
      annotationSystem.addDelayedAnnotationNoBubble(
        null,
        {x: 50, y: 20},
        `Improvement: +${improvement.toFixed(1)} years over ${yearsSpan} years`,
        appState.annotationDelay * 3,
        true,
        {
          fontSize: "14px",
          color: "#e74c3c",
          fontWeight: "700"
        }
      );
    }
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function showTooltip(event, data) {
  const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background", "rgba(0, 0, 0, 0.8)")
    .style("color", "white")
    .style("padding", "8px 12px")
    .style("border-radius", "4px")
    .style("font-size", "12px")
    .style("pointer-events", "none")
    .style("z-index", "1000");

  let tooltipContent = "";
  
  // Handle GDP vs Life Expectancy data (Scene 0)
  if (data.country && data.gdp !== undefined && data.lifeExp !== undefined) {
    tooltipContent = `<strong>${data.country}</strong><br/>`;
    tooltipContent += `GDP per capita: $${data.gdp.toLocaleString()}<br/>`;
    tooltipContent += `Life Expectancy: ${data.lifeExp.toFixed(1)} years<br/>`;
    tooltipContent += `Region: ${data.region}`;
  }
  // Handle life expectancy trend data (Scene 2)
  else if (data.country && data.year && data.value) {
    tooltipContent = `<strong>${data.country}</strong><br/>`;
    tooltipContent += `Year: ${data.year}<br/>`;
    tooltipContent += `Life Expectancy: ${data.value.toFixed(1)} years`;
  }
  // Handle Gini index data (Scene 1)
  else if (data.region && data.avgGini !== undefined) {
    tooltipContent = `<strong>${data.region}</strong><br/>Average Gini Index: ${data.avgGini.toFixed(2)}`;
  }

  tooltip.html(tooltipContent)
    .style("left", (event.pageX + 10) + "px")
    .style("top", (event.pageY - 28) + "px");
}

function hideTooltip() {
  d3.selectAll(".tooltip").remove();
}

// ============================================================================
// INITIALIZATION
// ============================================================================

// Load data and initialize

// Load the complete dataset with all countries
d3.csv("data/WDICSV_all_clean.csv?v=6").then(raw => {
    
    dataStore.rawData = [];
    
        // Process the CSV data with headers and year columns
    raw.forEach((row, index) => {
      const country = row["Country Name"];
      const countryCode = row["Country Code"];
      const region = getRegionFromCountryCode(countryCode);
      const indicator = row["Indicator Name"];
      

      
      // Get all year columns (2005-2020)
      const yearColumns = Object.keys(row).filter(key => /^\d{4}$/.test(key));
      
      yearColumns.forEach(yearStr => {
        const year = parseInt(yearStr);
        const val = +row[yearStr];
        if (!isNaN(val) && val > 0) {
          dataStore.rawData.push({
            country,
            region,
            indicator,
            year: year,
            value: val
          });
        }
      });
    });
    
    // Check for specific indicators
    const gdpData = dataStore.rawData.filter(d => d.indicator === "GDP per capita (current US$)");
    const lifeExpData = dataStore.rawData.filter(d => d.indicator === "Life expectancy at birth, total (years)" || d.indicator === "Life expectancy at birth total (years)");
    const giniData = dataStore.rawData.filter(d => d.indicator === "Gini index");
    


    processData();
    
    renderScene(appState.currentScene);
    
    new TriggerSystem();
    
  }).catch(error => {
    // Show error on page
    d3.select("#chart").append("div")
      .style("text-align", "center")
      .style("padding", "20px")
      .style("color", "red")
      .html(`Error loading data: ${error.message}`);
  });


