/**
 * Calculates monthly fuel consumption and cost.
 *
 * @param {number} fuelPricePerLitre - Fuel price in currency per litre.
 * @param {number} averageKmPerDay - Average kilometers driven per day.
 * @param {number} mileageKmPerLitre - Vehicle mileage (km per litre).
 * @param {number} daysPerMonth - Optional. Defaults to 30.
 * @returns {{ fuelConsumption: number, fuelCost: number }} - Result in litres and cost.
 */
function calculateMonthlyFuelUsage(
  fuelPricePerLitre,
  averageKmPerDay,
  mileageKmPerLitre,
  daysPerMonth = 30
) {
  if (mileageKmPerLitre <= 0) {
    throw new Error('Mileage must be greater than zero');
  }

  const totalKmPerMonth = averageKmPerDay * daysPerMonth;
  const fuelConsumption = totalKmPerMonth / mileageKmPerLitre;
  const fuelCost = fuelConsumption * fuelPricePerLitre;

  return {
    fuelConsumption: parseFloat(fuelConsumption.toFixed(2)),
    fuelCost: parseFloat(fuelCost.toFixed(2)),
  };
}

module.exports = { calculateMonthlyFuelUsage };
