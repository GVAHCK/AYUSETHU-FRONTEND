import React, { useState } from 'react';
import PortalLayout from '../components/PortalLayout';
import Dashboard from '../components/Dashboard';

import FormField from '../components/FormField';
import { INDIAN_STATES, STANDARDS } from '../data/standards';

const std = STANDARDS.oils;

function generateLotId(prefix = "AYU-OIL") {
    const d = new Date();
    const ds = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
    return `${prefix}-${ds}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
}

export default function OilsPortal() {
    const [section, setSection] = useState('dashboard');

    const [form, setForm] = useState({
        // F1-F5
        farmerId: '', farmerName: '', farmState: '', farmDistrict: '', farmVillage: '', exactGps: '', herbName: '', plantPart: '', cultivationMethod: '', contractedQty: '', expectedHarvestDate: '', farmPhoto: '', aggBatchId: generateLotId('AYU-FARM'), aggregatorId: generateLotId('AGG'), visitTimestamp: new Date().toISOString(),
        cropPhoto: '', chemFertilizer: '', pesticideUsed: '', pestAttack: '', stage2Timestamp: '',
        harvestPhoto: '', harvestVoiceNote: '', harvestDate: '', harvestGps: '',
        dryingMethod: '', dryingPhoto: '', readyForPickup: '', readyTimestamp: '',
        actualWeight: '', visualQC: '', moistureReading: '', dryingDuration: '', gradeAssigned: '', foreignMaterial: '', labSampleCollected: '', labSampleRef: '', pickupPhoto: '', destManufacturer: '', transportVehicleNo: '', aggregatorGps: '', pickupTimestamp: '', aggregatorSig: '',

        // Base Oil Supplier
        boType: '', boExtraction: '', boState: '', boFssai: '', boBatchVolume: '', boFfa: '', boPv: '', boFattyAcidPdf: '', boBatchId: generateLotId('AYU-BASEOIL'),

        // RM Testing (Herbs + Base Oil)
        rmLabName: '', rmNablNo: '', rmTestDate: '', rmIdentityTLC: '', rmHeavyMetals: '', rmPesticide: '', rmMicrobial: '', rmMoisture: '', rmActiveCompound: '', rmActiveCompliance: '', rmBaseOilFfa: '', rmBaseOilPv: '', rmBaseOilAdulterant: '', rmCoaPdf: '', rmOverallResult: '',

        // Manufacturer - Oil
        mfgAyushLicense: '', mfgGmpCert: '', mfgBatchNo: generateLotId('AYU-OIL-MFG'), mfgProductName: '', mfgClassicalRef: '', mfgPrepMethod: '', mfgIngredientBatchIds: '', mfgBaseOilBatchId: '', mfgExactRatios: '', mfgCookingTemp: '', mfgCookingDuration: '', mfgYield: '', mfgDate: '', expDate: '', bmrRefNo: '', qcOfficerSig: '', mfgSlaCertNo: '', mfgSlaDate: '',

        // Finished Oil Testing
        fpMfgBatchNo: '', fpLabName: '', fpNablNo: '', fpTestDate: '', fpSpecificGravityExact: '', fpSpecificGravityComp: '', fpRefractiveIndexExact: '', fpRefractiveIndexComp: '', fpAcidValue: '', fpPv: '', fpHeavyMetals: '', fpMicrobial: '', fpMarkerComp: '', fpNirCsv: '', fpNirHash: '', fpCoaPdf: '', fpOverallResult: '',

        // Bottling
        pkgBatchId: '', pkgUnitSerialNo: generateLotId('BTL'), pkgSize: '', pkgMrp: '', pkgIpfsCid: '', pkgTxHash: '', pkgRsaSig: ''
    });

    const up = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const renderSection = () => {
        switch (section) {
            case 'dashboard':
                return (
                    <div className="portal-content">
                        <div className="product-header ph-oils">
                            <div className="product-num">PRODUCT CATEGORY · 01 OF 05</div>
                            <h1 className="product-title">Ayurvedic Oils (Thailam)</h1>
                            <div className="product-tags">
                                <span className="ptag">Drugs & Cosmetics Act 1940</span>
                                <span className="ptag">AYUSH GMP Schedule T</span>
                            </div>
                        </div>
                        <div style={{ padding: '40px', maxWidth: 1200 }}>
                            <Dashboard category="oils" onNavigate={setSection} actions={[
                                { label: 'Farmer Stage 1: Init', value: 'stage1', primary: true },
                                { label: 'Farmer Stage 2: Grow', value: 'stage2', primary: true },
                                { label: 'Farmer Stage 3: Harvest', value: 'stage3', primary: true },
                                { label: 'Farmer Stage 4: Pickup Ready', value: 'stage4', primary: true },
                                { label: 'Farmer Stage 5: Aggregator Close', value: 'stage5', primary: true },
                                { label: 'Base Oil Supplier', value: 'base_oil', primary: true },
                                { label: 'Raw Material Testing (Herbs + Oil)', value: 'rm_testing', primary: true },
                                { label: 'Manufacturer — Oil', value: 'manufacturer', primary: true },
                                { label: 'Finished Oil Testing', value: 'fp_testing', primary: true },
                                { label: 'Bottling & QR', value: 'packaging', primary: false }
                            ]} />
                        </div>
                    </div>
                );

            case 'stage1':
                return (
                    <div className="portal-content">
                        <div className="product-header ph-oils">
                            <div className="product-num">SUPPLY CHAIN 2</div>
                            <h1 className="product-title">Farmer Stage 1: Aggregator Initializes</h1>
                        </div>
                        <div style={{ padding: '40px', maxWidth: 1200 }}>
                            <div className="portal-form-grid">
                                <FormField label="Farmer ID" value={form.farmerId} onChange={v => up('farmerId', v)} />
                                <FormField label="Farmer Name" value={form.farmerName} onChange={v => up('farmerName', v)} />
                                <FormField label="Farm State, District, Village" value={`${form.farmState} ${form.farmDistrict} ${form.farmVillage}`} onChange={v => { const pts = v.split(' '); up('farmState', pts[0] || ''); up('farmDistrict', pts[1] || ''); up('farmVillage', pts[2] || ''); }} />
                                <FormField label="Exact Farm GPS (auto)" value={form.exactGps} onChange={v => up('exactGps', v)} />
                                <FormField label="Herb Name" value={form.herbName} onChange={v => up('herbName', v)} />
                                <FormField label="Plant Part" value={form.plantPart} onChange={v => up('plantPart', v)} />
                                <FormField label="Cultivation Method" value={form.cultivationMethod} onChange={v => up('cultivationMethod', v)} />
                                <FormField label="Contracted Quantity (kg)" type="number" value={form.contractedQty} onChange={v => up('contractedQty', v)} />
                                <FormField label="Expected Harvest Date" type="date" value={form.expectedHarvestDate} onChange={v => up('expectedHarvestDate', v)} />
                                <FormField label="Farm Photo" value={form.farmPhoto} onChange={v => up('farmPhoto', v)} />
                                <FormField label="Batch ID (auto)" value={form.aggBatchId} readOnly />
                                <FormField label="Aggregator ID (auto)" value={form.aggregatorId} readOnly />
                                <FormField label="Visit Timestamp (auto)" value={form.visitTimestamp} readOnly />
                            </div>
                            <div className="form-actions">
                                <button className="btn-primary" onClick={() => setSection('dashboard')}>Save & Generate QR</button>
                            </div>
                        </div>
                    </div>
                );

            case 'stage2':
                return (
                    <div className="portal-content">
                        <div className="product-header ph-oils">
                            <div className="product-num">SUPPLY CHAIN 2</div>
                            <h1 className="product-title">Farmer Stage 2: Growing Phase</h1>
                        </div>
                        <div style={{ padding: '40px', maxWidth: 1200 }}>
                            <div className="portal-form-grid">
                                <FormField label="Batch ID (scan QR)" value={form.aggBatchId} onChange={v => up('aggBatchId', v)} />
                                <FormField label="Crop Photo" value={form.cropPhoto} onChange={v => up('cropPhoto', v)} />
                                <FormField label="Chemical Fertilizer Used? (yes/no)" type="radio" options={['Yes', 'No']} value={form.chemFertilizer} onChange={v => up('chemFertilizer', v)} />
                                <FormField label="Pesticide Used? (yes/no)" type="radio" options={['Yes', 'No']} value={form.pesticideUsed} onChange={v => up('pesticideUsed', v)} />
                                <FormField label="Pest/Disease Attack? (yes/no)" type="radio" options={['Yes', 'No']} value={form.pestAttack} onChange={v => up('pestAttack', v)} />
                                <FormField label="Upload Timestamp (auto)" value={new Date().toISOString()} readOnly />
                            </div>
                            <div className="form-actions">
                                <button className="btn-primary" onClick={() => setSection('dashboard')}>Submit Update</button>
                            </div>
                        </div>
                    </div>
                );

            case 'stage3':
                return (
                    <div className="portal-content">
                        <div className="product-header ph-oils">
                            <div className="product-num">SUPPLY CHAIN 2</div>
                            <h1 className="product-title">Farmer Stage 3: Harvest Day</h1>
                        </div>
                        <div style={{ padding: '40px', maxWidth: 1200 }}>
                            <div className="portal-form-grid">
                                <FormField label="Batch ID (scan QR)" value={form.aggBatchId} onChange={v => up('aggBatchId', v)} />
                                <FormField label="Harvest Photo" value={form.harvestPhoto} onChange={v => up('harvestPhoto', v)} />
                                <FormField label="Harvest Voice Note (optional)" value={form.harvestVoiceNote} onChange={v => up('harvestVoiceNote', v)} />
                                <FormField label="Harvest Date (auto)" type="date" value={new Date().toISOString().split('T')[0]} readOnly />
                                <FormField label="Harvest GPS (auto)" value={form.harvestGps || "28.6139, 77.2090"} readOnly />
                            </div>
                            <div className="form-actions">
                                <button className="btn-primary" onClick={() => setSection('dashboard')}>Submit Harvest Log</button>
                            </div>
                        </div>
                    </div>
                );

            case 'stage4':
                return (
                    <div className="portal-content">
                        <div className="product-header ph-oils">
                            <div className="product-num">SUPPLY CHAIN 2</div>
                            <h1 className="product-title">Farmer Stage 4: Pickup Ready</h1>
                        </div>
                        <div style={{ padding: '40px', maxWidth: 1200 }}>
                            <div className="portal-form-grid">
                                <FormField label="Batch ID (scan QR)" value={form.aggBatchId} onChange={v => up('aggBatchId', v)} />
                                <FormField label="Drying Method (picture tap)" type="select" options={['Sun Dried', 'Shade Dried', 'Machine Dried']} value={form.dryingMethod} onChange={v => up('dryingMethod', v)} />
                                <FormField label="Drying Photo" value={form.dryingPhoto} onChange={v => up('dryingPhoto', v)} />
                                <FormField label="Ready for Pickup (1 button)" type="select" options={['Yes', 'No']} value={form.readyForPickup} onChange={v => up('readyForPickup', v)} />
                                <FormField label="Ready Timestamp (auto)" value={new Date().toISOString()} readOnly />
                            </div>
                            <div className="form-actions">
                                <button className="btn-primary" onClick={() => setSection('dashboard')}>Notify Aggregator</button>
                            </div>
                        </div>
                    </div>
                );

            case 'stage5':
                return (
                    <div className="portal-content">
                        <div className="product-header ph-oils">
                            <div className="product-num">SUPPLY CHAIN 2</div>
                            <h1 className="product-title">Farmer Stage 5: Aggregator Closes</h1>
                        </div>
                        <div style={{ padding: '40px', maxWidth: 1200 }}>
                            <div className="portal-form-grid">
                                <FormField label="Batch ID (scan QR)" value={form.aggBatchId} onChange={v => up('aggBatchId', v)} />
                                <FormField label="Actual Weight Picked Up (kg)" type="number" value={form.actualWeight} onChange={v => up('actualWeight', v)} />
                                <FormField label="Visual Quality Check" value={form.visualQC} onChange={v => up('visualQC', v)} />
                                <FormField label="Moisture Reading (%)" type="number" value={form.moistureReading} onChange={v => up('moistureReading', v)} />
                                <FormField label="Drying Duration (days)" type="number" value={form.dryingDuration} onChange={v => up('dryingDuration', v)} />
                                <FormField label="Grade Assigned (A/B/C)" type="select" options={['A', 'B', 'C']} value={form.gradeAssigned} onChange={v => up('gradeAssigned', v)} />
                                <FormField label="Foreign Material Visible? (yes/no)" type="radio" options={['Yes', 'No']} value={form.foreignMaterial} onChange={v => up('foreignMaterial', v)} />
                                <FormField label="Lab Sample Collected? (yes/no)" type="radio" options={['Yes', 'No']} value={form.labSampleCollected} onChange={v => up('labSampleCollected', v)} />
                                <FormField label="Lab Sample Reference No." value={form.labSampleRef} onChange={v => up('labSampleRef', v)} />
                                <FormField label="Pickup Photo" value={form.pickupPhoto} onChange={v => up('pickupPhoto', v)} />
                                <FormField label="Destination Manufacturer" value={form.destManufacturer} onChange={v => up('destManufacturer', v)} />
                                <FormField label="Transport Vehicle No." value={form.transportVehicleNo} onChange={v => up('transportVehicleNo', v)} />
                                <FormField label="Aggregator GPS (auto)" value={form.aggregatorGps || "28.6139, 77.2090"} readOnly />
                                <FormField label="Pickup Timestamp (auto)" value={new Date().toISOString()} readOnly />
                                <FormField label="Aggregator Digital Signature (wallet)" value={form.aggregatorSig || "0x..."} readOnly />
                            </div>
                            <div className="form-actions">
                                <button className="btn-primary" onClick={() => setSection('dashboard')}>Close Farm Stage</button>
                            </div>
                        </div>
                    </div>
                );

            case 'base_oil':
                return (
                    <div className="portal-content">
                        <div className="product-header ph-oils">
                            <div className="product-num">SUPPLY CHAIN 2</div>
                            <h1 className="product-title">BASE OIL SUPPLIER</h1>
                        </div>
                        <div style={{ padding: '40px', maxWidth: 1200 }}>
                            <div className="portal-form-grid">
                                <FormField label="Base Oil Type" type="select" options={['Sesame Oil', 'Coconut Oil', 'Mustard Oil', 'Castor Oil']} value={form.boType} onChange={v => up('boType', v)} />
                                <FormField label="Extraction Method" type="select" options={['Cold Pressed', 'Expeller Pressed', 'Solvent Extracted']} value={form.boExtraction} onChange={v => up('boExtraction', v)} />
                                <FormField label="Oilseed Source State" type="select" options={INDIAN_STATES} value={form.boState} onChange={v => up('boState', v)} />
                                <FormField label="FSSAI License No." value={form.boFssai} onChange={v => up('boFssai', v)} />
                                <FormField label="Batch Volume (Litres)" type="number" value={form.boBatchVolume} onChange={v => up('boBatchVolume', v)} />
                                <FormField label="FFA %" type="number" step="0.01" value={form.boFfa} onChange={v => up('boFfa', v)} />
                                <FormField label="Peroxide Value" type="number" step="0.1" value={form.boPv} onChange={v => up('boPv', v)} />
                                <FormField label="Fatty Acid Profile PDF (IPFS)" value={form.boFattyAcidPdf} onChange={v => up('boFattyAcidPdf', v)} />
                                <FormField label="Base Oil Batch ID (auto)" value={form.boBatchId} readOnly />
                            </div>
                            <div className="form-actions">
                                <button className="btn-primary" onClick={() => setSection('dashboard')}>Submit Base Oil Batch</button>
                            </div>
                        </div>
                    </div>
                );

            case 'rm_testing':
                return (
                    <div className="portal-content">
                        <div className="product-header ph-oils">
                            <div className="product-num">SUPPLY CHAIN 2</div>
                            <h1 className="product-title">RAW MATERIAL TESTING — Herbs + Base Oil</h1>
                        </div>
                        <div style={{ padding: '40px', maxWidth: 1200 }}>
                            <div className="sec-head"><span className="sec-num">HERBS</span><h3 className="sec-title">Herbs Testing</h3><span className="sec-rule"></span></div>
                            <div className="portal-form-grid">
                                <FormField label="Batch ID (scan)" value={form.aggBatchId} onChange={v => up('aggBatchId', v)} />
                                <FormField label="Lab Name" value={form.rmLabName} onChange={v => up('rmLabName', v)} />
                                <FormField label="NABL Accreditation No." value={form.rmNablNo} onChange={v => up('rmNablNo', v)} />
                                <FormField label="Test Date" type="date" value={form.rmTestDate} onChange={v => up('rmTestDate', v)} />
                                <FormField label="Identity Test TLC (pass/fail)" type="select" options={['Pass', 'Fail']} value={form.rmIdentityTLC} onChange={v => up('rmIdentityTLC', v)} />
                                <FormField label="Heavy Metals — Pb, Hg, As, Cd (pass/fail)" type="select" options={['Pass', 'Fail']} value={form.rmHeavyMetals} onChange={v => up('rmHeavyMetals', v)} />
                                <FormField label="Pesticide Residue (pass/fail)" type="select" options={['Pass', 'Fail']} value={form.rmPesticide} onChange={v => up('rmPesticide', v)} />
                                <FormField label="Microbial Count (pass/fail)" type="select" options={['Pass', 'Fail']} value={form.rmMicrobial} onChange={v => up('rmMicrobial', v)} />
                                <FormField label="Moisture Content (pass/fail)" type="select" options={['Pass', 'Fail']} value={form.rmMoisture} onChange={v => up('rmMoisture', v)} />
                                <FormField label="Active Compound % (confidential)" type="number" value={form.rmActiveCompound} onChange={v => up('rmActiveCompound', v)} />
                                <FormField label="Active Compound Compliance (pass/fail)" type="select" options={['Pass', 'Fail']} value={form.rmActiveCompliance} onChange={v => up('rmActiveCompliance', v)} />
                                <FormField label="COA PDF (IPFS)" value={form.rmCoaPdf} onChange={v => up('rmCoaPdf', v)} />
                                <FormField label="Overall Result (approved/rejected)" type="select" options={['Approved', 'Rejected']} value={form.rmOverallResult} onChange={v => up('rmOverallResult', v)} />
                            </div>

                            <div className="sec-head" style={{ marginTop: 30 }}><span className="sec-num">BASE OIL</span><h3 className="sec-title">Base Oil Testing</h3><span className="sec-rule"></span></div>
                            <div className="portal-form-grid">
                                <FormField label="Base Oil Batch ID (scan)" value={form.boBatchId} onChange={v => up('boBatchId', v)} />
                                <FormField label="FFA % Compliance (pass/fail)" type="select" options={['Pass', 'Fail']} value={form.rmBaseOilFfa} onChange={v => up('rmBaseOilFfa', v)} />
                                <FormField label="Peroxide Value Compliance (pass/fail)" type="select" options={['Pass', 'Fail']} value={form.rmBaseOilPv} onChange={v => up('rmBaseOilPv', v)} />
                                <FormField label="Adulterant Detection (pass/fail)" type="select" options={['Pass', 'Fail']} value={form.rmBaseOilAdulterant} onChange={v => up('rmBaseOilAdulterant', v)} />
                                <FormField label="Base Oil COA PDF (IPFS)" value={form.rmCoaPdf} onChange={v => up('rmCoaPdf', v)} />
                                <FormField label="Base Oil Overall Result" type="select" options={['Approved', 'Rejected']} value={form.rmOverallResult} onChange={v => up('rmOverallResult', v)} />
                            </div>

                            <div className="form-actions">
                                <button className="btn-primary" onClick={() => setSection('dashboard')}>Upload COA & Notify Manufacturer</button>
                            </div>
                        </div>
                    </div>
                );

            case 'manufacturer':
                return (
                    <div className="portal-content">
                        <div className="product-header ph-oils">
                            <div className="product-num">SUPPLY CHAIN 2</div>
                            <h1 className="product-title">MANUFACTURER — OIL</h1>
                        </div>
                        <div style={{ padding: '40px', maxWidth: 1200 }}>
                            <div className="portal-form-grid">
                                <FormField label="AYUSH License No." value={form.mfgAyushLicense} onChange={v => up('mfgAyushLicense', v)} />
                                <FormField label="GMP Certificate No." value={form.mfgGmpCert} onChange={v => up('mfgGmpCert', v)} />
                                <FormField label="Oil Batch No. (auto)" value={form.mfgBatchNo} readOnly />
                                <FormField label="Oil Formula Name" value={form.mfgProductName} onChange={v => up('mfgProductName', v)} />
                                <FormField label="Classical Reference Text" value={form.mfgClassicalRef} onChange={v => up('mfgClassicalRef', v)} />
                                <FormField label="Preparation Method (Kalka / Sheeta Paka)" value={form.mfgPrepMethod} onChange={v => up('mfgPrepMethod', v)} />
                                <FormField label="All Herb Batch IDs Linked (multi QR scan)" value={form.mfgIngredientBatchIds} onChange={v => up('mfgIngredientBatchIds', v)} />
                                <FormField label="Base Oil Batch ID Linked (QR scan)" value={form.mfgBaseOilBatchId} onChange={v => up('mfgBaseOilBatchId', v)} />
                                <FormField label="Herb : Oil : Water Ratio (confidential)" value={form.mfgExactRatios} onChange={v => up('mfgExactRatios', v)} />
                                <FormField label="Cooking Temperature °C (confidential)" type="number" value={form.mfgCookingTemp} onChange={v => up('mfgCookingTemp', v)} />
                                <FormField label="Cooking Duration (hours) (confidential)" type="number" value={form.mfgCookingDuration} onChange={v => up('mfgCookingDuration', v)} />
                                <FormField label="Yield (Litres)" type="number" value={form.mfgYield} onChange={v => up('mfgYield', v)} />
                                <FormField label="Manufacturing Date" type="date" value={form.mfgDate} onChange={v => up('mfgDate', v)} />
                                <FormField label="Expiry Date" type="date" value={form.expDate} onChange={v => up('expDate', v)} />
                                <FormField label="BMR Reference No." value={form.bmrRefNo} onChange={v => up('bmrRefNo', v)} />
                                <FormField label="QC Officer Signature (wallet)" value={form.qcOfficerSig} onChange={v => up('qcOfficerSig', v)} />

                                <FormField label="SLA Certificate No. (locked until finished oil testing approved)" value={form.mfgSlaCertNo} onChange={v => up('mfgSlaCertNo', v)} readOnly={form.fpOverallResult !== 'Approved'} />
                                <FormField label="SLA Approval Date (locked until finished oil testing approved)" type="date" value={form.mfgSlaDate} onChange={v => up('mfgSlaDate', v)} readOnly={form.fpOverallResult !== 'Approved'} />
                            </div>
                            <div className="form-actions">
                                <button className="btn-primary" onClick={() => setSection('dashboard')}>Finalize Oil Batch</button>
                            </div>
                        </div>
                    </div>
                );

            case 'fp_testing':
                return (
                    <div className="portal-content">
                        <div className="product-header ph-oils">
                            <div className="product-num">SUPPLY CHAIN 2</div>
                            <h1 className="product-title">FINISHED OIL TESTING — NABL Lab</h1>
                        </div>
                        <div style={{ padding: '40px', maxWidth: 1200 }}>
                            <div className="portal-form-grid">
                                <FormField label="Oil Batch No. (scan — pulls manufacturer details automatically)" value={form.mfgBatchNo} onChange={v => up('fpMfgBatchNo', v)} />
                                <FormField label="Lab Name & NABL No." value={form.fpLabName} onChange={v => up('fpLabName', v)} />
                                <FormField label="Test Date" type="date" value={form.fpTestDate} onChange={v => up('fpTestDate', v)} />
                                <FormField label="Specific Gravity — exact (B2B) + compliance (pass/fail)" type="number" step="0.001" value={form.fpSpecificGravityExact} onChange={v => up('fpSpecificGravityExact', v)} />
                                <FormField label="Refractive Index — exact (B2B) + compliance (pass/fail)" type="number" step="0.0001" value={form.fpRefractiveIndexExact} onChange={v => up('fpRefractiveIndexExact', v)} />
                                <FormField label="Acid Value" type="number" step="0.1" value={form.fpAcidValue} onChange={v => up('fpAcidValue', v)} />
                                <FormField label="Peroxide Value" type="number" step="0.1" value={form.fpPv} onChange={v => up('fpPv', v)} />
                                <FormField label="Heavy Metals (pass/fail)" type="select" options={['Pass', 'Fail']} value={form.fpHeavyMetals} onChange={v => up('fpHeavyMetals', v)} />
                                <FormField label="Microbial (pass/fail)" type="select" options={['Pass', 'Fail']} value={form.fpMicrobial} onChange={v => up('fpMicrobial', v)} />
                                <FormField label="Marker Compound Compliance (pass/fail)" type="select" options={['Pass', 'Fail']} value={form.fpMarkerComp} onChange={v => up('fpMarkerComp', v)} />
                                <FormField label="NIR Spectral Fingerprint CSV (IPFS private)" value={form.fpNirCsv} onChange={v => up('fpNirCsv', v)} />
                                <FormField label="NIR Hash (auto)" value={form.fpNirHash || "0x..."} readOnly />
                                <FormField label="Finished Oil COA PDF (IPFS)" value={form.fpCoaPdf} onChange={v => up('fpCoaPdf', v)} />
                                <FormField label="Overall Result" type="select" options={['Approved', 'Rejected']} value={form.fpOverallResult} onChange={v => up('fpOverallResult', v)} />
                            </div>
                            <div className="form-actions">
                                <button className="btn-primary" onClick={() => setSection('dashboard')}>Unlock SLA & Notify Manufacturer</button>
                            </div>
                        </div>
                    </div>
                );

            case 'packaging':
                // locked until SLA fields filled
                const isPkgLocked = !form.mfgSlaCertNo;
                return (
                    <div className="portal-content">
                        <div className="product-header ph-oils">
                            <div className="product-num">SUPPLY CHAIN 2</div>
                            <h1 className="product-title">BOTTLING & QR GENERATION</h1>
                        </div>
                        <div style={{ padding: '40px', maxWidth: 1200 }}>
                            {isPkgLocked && <div className="card" style={{ marginBottom: 20 }}><strong>Locked:</strong> Waiting for SLA Certificate from Manufacturer.</div>}
                            <div className="portal-form-grid" style={{ opacity: isPkgLocked ? 0.5 : 1, pointerEvents: isPkgLocked ? 'none' : 'auto' }}>
                                <FormField label="Oil Batch ID (scan)" value={form.mfgBatchNo} onChange={v => up('pkgBatchId', v)} />
                                <FormField label="Bottle Serial No. (auto)" value={form.pkgUnitSerialNo} readOnly />
                                <FormField label="Bottle Size (ml)" type="number" value={form.pkgSize} onChange={v => up('pkgSize', v)} />
                                <FormField label="MRP (₹)" type="number" value={form.pkgMrp} onChange={v => up('pkgMrp', v)} />
                                <FormField label="IPFS CID (auto)" value={"Qm..."} readOnly />
                                <FormField label="RSA Signature (auto)" value={"..."} readOnly />
                                <FormField label="TX Hash (auto)" value={"0x..."} readOnly />
                            </div>
                            <div className="form-actions">
                                <button className="btn-primary" onClick={() => setSection('dashboard')} disabled={isPkgLocked}>Generate Bottle QR</button>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="portal-content">
                        <div style={{ padding: '40px', maxWidth: 1200 }}>
                            <div className="card"><p style={{ fontFamily: 'DM Sans', color: 'var(--ink)' }}>This section is under development.</p></div>
                            <button className="btn-outline" onClick={() => setSection('dashboard')} style={{ marginTop: 20 }}>Return to Dashboard</button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <PortalLayout categoryName="Edible Oils" categoryStandards={std.authority} activeSection={section} onSectionChange={setSection} topbarTitle="Oils Portal">
            {renderSection()}
        </PortalLayout>
    );
}
