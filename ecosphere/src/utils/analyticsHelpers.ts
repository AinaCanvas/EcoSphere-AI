import type { RegionData, FilterMetric } from '../data/regionalData'

export function getRankedRegions(
  regions: RegionData[],
  metric: FilterMetric,
): { cleanest: RegionData[]; mostPolluted: RegionData[] } {
  const sorted = [...regions]

  switch (metric) {
    case 'AQI':
      sorted.sort((a, b) => a.aqi - b.aqi)
      break
    case 'CO2':
      sorted.sort((a, b) => a.co2PerCapita - b.co2PerCapita)
      break
    case 'Renewable':
      sorted.sort((a, b) => b.renewablePercent - a.renewablePercent)
      break
    case 'Pollution': {
      const order = { Low: 0, Moderate: 1, High: 2, Critical: 3 }
      sorted.sort((a, b) => order[a.pollutionLevel] - order[b.pollutionLevel])
      break
    }
  }

  return {
    cleanest: sorted.slice(0, 5),
    mostPolluted: sorted.slice(-5).reverse(),
  }
}

export function getInsights(regions: RegionData[]) {
  const bestAqi = [...regions].sort((a, b) => a.aqi - b.aqi)[0]
  const worstAqi = [...regions].sort((a, b) => b.aqi - a.aqi)[0]
  const bestRenewable = [...regions].sort((a, b) => b.renewablePercent - a.renewablePercent)[0]
  const lowestCo2 = [...regions].sort((a, b) => a.co2PerCapita - b.co2PerCapita)[0]
  const highestCo2 = [...regions].sort((a, b) => b.co2PerCapita - a.co2PerCapita)[0]

  return { bestAqi, worstAqi, bestRenewable, lowestCo2, highestCo2 }
}

export function getAqiLabel(aqi: number): string {
  if (aqi <= 50) return 'Good'
  if (aqi <= 100) return 'Moderate'
  if (aqi <= 150) return 'Unhealthy for Sensitive'
  if (aqi <= 200) return 'Unhealthy'
  if (aqi <= 300) return 'Very Unhealthy'
  return 'Hazardous'
}

export function getAqiColor(aqi: number): string {
  if (aqi <= 50) return '#22ffa8'
  if (aqi <= 100) return '#4ad8ff'
  if (aqi <= 150) return '#fbbf24'
  if (aqi <= 200) return '#fb923c'
  return '#f87171'
}

export function buildComparisonData(regions: RegionData[]) {
  return regions.map((r) => ({
    name: r.name.split(' ')[0],
    AQI: r.aqi,
    CO2: r.co2PerCapita,
    Renewable: r.renewablePercent,
  }))
}
