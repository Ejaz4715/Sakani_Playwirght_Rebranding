'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getProject = getProject;
exports.getAvailableUnits = getAvailableUnits;
exports.findBookableNonBeneUnit = findBookableNonBeneUnit;
exports.findBookableUnit = findBookableUnit;
exports.getBeneficiary = getBeneficiary;
exports.getActiveBookingProjectCodes = getActiveBookingProjectCodes;
const test_1 = require('@playwright/test');
const testData_1 = require('@data/testData');
async function fetchJson(page, url) {
  return page.evaluate(async (u) => {
    const res = await fetch(u, { credentials: 'include', headers: { Accept: 'application/json' } });
    return res.json();
  }, url);
}
/** Read project-level metadata, including the `bookable` gate. */
async function getProject(page, projectId) {
  const body = await fetchJson(page, testData_1.API.project(projectId));
  const a = body?.data?.attributes ?? {};
  return {
    id: String(a.id ?? projectId),
    code: a.code,
    nameEn: a.media_name_en ?? a.name,
    projectType: a.project_type,
    phase: a.phase,
    status: a.status,
    bookable: Boolean(a.bookable),
    availableUnitsCount: a.units_statistic_data?.available_units_count ?? 0,
  };
}
/** All units the marketplace currently reports as available for a project. */
async function getAvailableUnits(page, projectId) {
  const body = await fetchJson(page, testData_1.API.availableUnits(projectId));
  return (body?.data ?? []).map((u) => ({
    id: String(u.id),
    unitName: u.attributes?.unit_name,
    unitType: u.attributes?.unit_type,
    unitModelId: String(u.attributes?.unit_model_id),
    price: u.attributes?.price,
    targetSegments: Array.isArray(u.attributes?.target_segments) ? u.attributes.target_segments : [u.attributes?.target_segments].filter(Boolean),
    bookingStatus: u.attributes?.booking_status,
  }));
}
/**
 * First unit a non-beneficiary account is actually allowed to book.
 * Business rule: units carry `target_segments`; a non-beneficiary may only book
 * inventory whose segments include `non_bene`.
 */
async function findBookableNonBeneUnit(page, projectId) {
  const units = await getAvailableUnits(page, projectId);
  const unit = units.find((u) => u.bookingStatus === 'available' && u.targetSegments.includes('non_bene'));
  (0, test_1.expect)(unit, `Expected project ${projectId} to expose at least one available non-beneficiary unit`).toBeTruthy();
  return unit;
}
/**
 * Same rule as `findBookableNonBeneUnit`, but returns `null` instead of failing
 * when nothing is available.
 *
 * Use this when a missing unit is a **test-data blocker** to be reported via
 * `test.skip` with a reason, rather than a product failure. The asserting
 * variant stays for journeys where absent inventory genuinely fails the test.
 */
async function findBookableUnit(page, projectId) {
  const units = await getAvailableUnits(page, projectId).catch(() => []);
  return units.find((u) => u.bookingStatus === 'available' && u.targetSegments.includes('non_bene')) ?? null;
}
/** The authenticated beneficiary profile — the source of truth for eligibility rules. */
async function getBeneficiary(page) {
  const body = await fetchJson(page, `${testData_1.API.me}?include=beneficiary_assets_detail,beneficiary_application,active_booking`);
  return body?.data?.attributes ?? {};
}
/** Project codes in which the account already holds an active booking. */
async function getActiveBookingProjectCodes(page) {
  const me = await getBeneficiary(page);
  return Object.keys(me.number_of_active_bookings_by_project ?? {});
}
