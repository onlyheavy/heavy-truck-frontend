/**
 * Calculates monthly electricity consumption and cost for an EV.
 *
 * @param {number} electricityPricePerUnit - Electricity price per kWh (₹ per unit).
 * @param {number} averageKmPerDay - Average kilometers driven per day.
 * @param {number} rangePerCharge - Vehicle range on a full charge (km).
 * @param {number} batteryCapacity - Battery capacity in kWh.
 * @param {number} daysPerMonth - Optional. Defaults to 30.
 * @returns {{ 
 *   energyConsumption: number, 
 *   energyCost: number,
 *   costPerKm: number,
 *   avgMonthlyRunningCost: number
 * }} 
 */
function calculateMonthlyElectricUsage(
  electricityPricePerUnit,
  averageKmPerDay,
  rangePerCharge,
  batteryCapacity,
  daysPerMonth = 30
) {
  if (rangePerCharge <= 0) {
    throw new Error('Range per charge must be greater than zero');
  }
  if (batteryCapacity <= 0) {
    throw new Error('Battery capacity must be greater than zero');
  }

  // 1. Total km driven per month
  const totalKmPerMonth = averageKmPerDay * daysPerMonth;

  // 2. Energy consumption per km (kWh per km)
  const kWhPerKm = batteryCapacity / rangePerCharge;

  // 3. Monthly energy consumption (kWh)
  const energyConsumption = totalKmPerMonth * kWhPerKm;

  // 4. Monthly energy cost (₹)
  const energyCost = energyConsumption * electricityPricePerUnit;

  // 5. Cost per km
  const costPerKm = energyCost / totalKmPerMonth;

  return {
    energyConsumption: parseFloat(energyConsumption.toFixed(2)),  // kWh
    energyCost: parseFloat(energyCost.toFixed(2)),                // ₹ per month
    costPerKm: parseFloat(costPerKm.toFixed(2)),                  // ₹ per km
    avgMonthlyRunningCost: parseFloat(energyCost.toFixed(2)),     // same as monthly cost
  };
}

module.exports = { calculateMonthlyElectricUsage };
