import React, { useState } from 'react';
import PortalLayout from '../components/PortalLayout';
import Dashboard from '../components/Dashboard';

import FormField from '../components/FormField';
import { INDIAN_STATES, STANDARDS } from '../data/standards';

const std = STANDARDS.cosmetics;

function generateLotId(prefix = "AYU-COS") {
    const d = new Date();
    const ds = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
    return `${prefix}-${ds}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
}

export default function CosmeticsPortal() {
    const [section, setSection] = useState('dashboard');

    const [form, setForm] = useState({
        // F1-F5
        farmerId: '', farmerName: '', farmState: '', farmDistrict: '', farmVillage: '', exactGps: '', herbName: '', plantPart: '', cultivationMethod: '', contractedQty: '', expectedHarvestDate: '', farmPhoto: '', aggBatchId: generateLotId('AYU-FARM'), aggregatorId: generateLotId('AGG'), visitTimestamp: new Date().toISOString(),
        cropPhoto: '', chemFertilizer: '', pesticideUsed: '', pestAttack: '', stage2Timestamp: '',
        harvestPhoto: '', harvestVoiceNote: '', harvestDate: '', harvestGps: '',
        dryingMethod: '', dryingPhoto: '', readyForPickup: '', readyTimestamp: '',
        actualWeight: '', visualQC: '', moistureReading: '', dryingDuration: '', gradeAssigned: '', foreignMaterial: '', labSampleCollected: '', labSampleRef: '', pickupPhoto: '', destManufacturer: '', transportVehicleNo: '', aggregatorGps: '', pickupTimestamp: '', aggregatorSig: '',

        // RM Testing
        rmLabName: '', rmNablNo: '', rmTestDate: '', rmIdentityTLC: '', rmHeavyMetals: '', rmPesticide: '', rmMicrobial: '', rmMoisture: '', rmActiveCompound: '', rmActiveCompliance: '', rmCoaPdf: '', rmOverallResult: '',

        // Processing & Pulverizing
        prBatchNo: generateLotId('AYU-POWDER'), prDestoner: '', prInitialWeight: '', prFinalWeight: '', prMeshSize: '', prUvSterilization: '', prRoomTemp: '', prRoomHumidity: '', prOperatorSig: '',

        // Finished Powder Testing
        fpMfgBatchNo: '', fpLabName: '', fpNablNo: '', fpTestDate: '', fpParticleSize: '', fpPhValue: '', fpHeavyMetals: '', fpMicrobial: '', fpHydroquinone: '', fpCorticosteroids: '', fpSkinIrritation: '', fpDermalToxicity: '', fpOverallResult: '', fpCoaPdf: '',

        // Packaging
        pkgBatchId: '', pkgUnitSerialNo: generateLotId('BOX'), pkgType: '', pkgWeight: '', pkgMrp: '', pkgIpfsCid: '', pkgTxHash: '', pkgRsaSig: ''
    });

    const up = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const renderSection = () => {
        switch (section) {
            case 'dashboard':
                return (
                    <div className="portal-content">
                        <div className="product-header ph-cosmetics">
                            <div className="product-num">PRODUCT CATEGORY · 03 OF 05</div>
                            <h1 className="product-title">Cosmetic Powders (Lepas)</h1>
                            <div className="product-tags">
                                <span className="ptag">Drugs & Cosmetics Act 1940</span>
                                <span className="ptag">BIS IS 4011:2018</span>
                            </div>
                        </div>
                        <div style={{ padding: '40px', maxWidth: 1200 }}>
                            <Dashboard category="cosmetics" onNavigate={setSection} actions={[
                                { label: 'Farmer Stage 1: Init', value: 'stage1', primary: true },
                                { label: 'Farmer Stage 2: Grow', value: 'stage2', primary: true },
                                { label: 'Farmer Stage 3: Harvest', value: 'stage3', primary: true },
                                { label: 'Farmer Stage 4: Pickup Ready', value: 'stage4', primary: true },
                                { label: 'Farmer Stage 5: Aggregator Close', value: 'stage5', primary: true },
                                { label: 'Raw Material Testing', value: 'rm_testing', primary: true },
                                { label: 'Processing & Pulverizing', value: 'processing', primary: true },
                                { label: 'Finished Powder Testing', value: 'fp_testing', primary: true },
                                { label: 'Packaging & QR', value: 'packaging', primary: false }
                            ]} />
                        </div>
                    </div>
                );

            case 'stage1':
                return (
                    <div className="portal-content">
                        <div className="product-header ph-cosmetics">
                            <div className="product-num">SUPPLY CHAIN 3</div>
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
                        <div className="product-header ph-cosmetics">
                            <div className="product-num">SUPPLY CHAIN 3</div>
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
                        <div className="product-header ph-cosmetics">
                            <div className="product-num">SUPPLY CHAIN 3</div>
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
                        <div className="product-header ph-cosmetics">
                            <div className="product-num">SUPPLY CHAIN 3</div>
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
                        <div className="product-header ph-cosmetics">
                            <div className="product-num">SUPPLY CHAIN 3</div>
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

            case 'rm_testing':
                return (
                    <div className="portal-content">
                        <div className="product-header ph-cosmetics">
                            <div className="product-num">SUPPLY CHAIN 3</div>
                            <h1 className="product-title">RAW MATERIAL TESTING — NABL Lab</h1>
                        </div>
                        <div style={{ padding: '40px', maxWidth: 1200 }}>
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
                            <div className="form-actions">
                                <button className="btn-primary" onClick={() => setSection('dashboard')}>Upload COA & Notify Processor</button>
                            </div>
                        </div>
                    </div>
                );

            case 'processing':
                return (
                    <div className="portal-content">
                        <div className="product-header ph-cosmetics">
                            <div className="product-num">SUPPLY CHAIN 3</div>
                            <h1 className="product-title">PROCESSING & PULVERIZING</h1>
                        </div>
                        <div style={{ padding: '40px', maxWidth: 1200 }}>
                            <div className="portal-form-grid">
                                <FormField label="Incoming Herb Batch IDs (multi QR scan)" value={form.aggBatchId} onChange={v => up('aggBatchId', v)} />
                                <FormField label="Powder Batch No. (auto)" value={form.prBatchNo} readOnly />
                                <FormField label="Destoner/Cleaning Passed? (yes/no)" type="radio" options={['Yes', 'No']} value={form.prDestoner} onChange={v => up('prDestoner', v)} />
                                <FormField label="Initial Weight (kg)" type="number" value={form.prInitialWeight} onChange={v => up('prInitialWeight', v)} />
                                <FormField label="Final Powder Weight (kg)" type="number" value={form.prFinalWeight} onChange={v => up('prFinalWeight', v)} />
                                <FormField label="Mesh Size Used (e.g. 80, 100 microns)" value={form.prMeshSize} onChange={v => up('prMeshSize', v)} />
                                <FormField label="UV Sterilization Done? (yes/no)" type="radio" options={['Yes', 'No']} value={form.prUvSterilization} onChange={v => up('prUvSterilization', v)} />
                                <FormField label="Room Temperature °C" type="number" value={form.prRoomTemp} onChange={v => up('prRoomTemp', v)} />
                                <FormField label="Room Humidity %" type="number" value={form.prRoomHumidity} onChange={v => up('prRoomHumidity', v)} />
                                <FormField label="Operator Signature (wallet)" value={form.prOperatorSig} onChange={v => up('prOperatorSig', v)} />
                            </div>
                            <div className="form-actions">
                                <button className="btn-primary" onClick={() => setSection('dashboard')}>Process Batch</button>
                            </div>
                        </div>
                    </div>
                );

            case 'fp_testing':
                return (
                    <div className="portal-content">
                        <div className="product-header ph-cosmetics">
                            <div className="product-num">SUPPLY CHAIN 3</div>
                            <h1 className="product-title">FINISHED POWDER TESTING — NABL Lab</h1>
                        </div>
                        <div style={{ padding: '40px', maxWidth: 1200 }}>
                            <div className="portal-form-grid">
                                <FormField label="Powder Batch No. (scan)" value={form.prBatchNo} onChange={v => up('fpMfgBatchNo', v)} />
                                <FormField label="Lab Name & NABL No." value={form.fpLabName} onChange={v => up('fpLabName', v)} />
                                <FormField label="Test Date" type="date" value={form.fpTestDate} onChange={v => up('fpTestDate', v)} />
                                <FormField label="Particle Size Distribution (pass/fail)" type="select" options={['Pass', 'Fail']} value={form.fpParticleSize} onChange={v => up('fpParticleSize', v)} />
                                <FormField label="pH Value (1% aqueous solution)" type="number" step="0.1" value={form.fpPhValue} onChange={v => up('fpPhValue', v)} />
                                <FormField label="Heavy Metals (Pb < 20ppm, As < 2ppm) (pass/fail)" type="select" options={['Pass', 'Fail']} value={form.fpHeavyMetals} onChange={v => up('fpHeavyMetals', v)} />
                                <FormField label="Microbial (Total Viable Count < 1000 CFU/g) (pass/fail)" type="select" options={['Pass', 'Fail']} value={form.fpMicrobial} onChange={v => up('fpMicrobial', v)} />
                                <FormField label="Absence of Hydroquinone (pass/fail)" type="select" options={['Pass', 'Fail']} value={form.fpHydroquinone} onChange={v => up('fpHydroquinone', v)} />
                                <FormField label="Absence of Corticosteroids (pass/fail)" type="select" options={['Pass', 'Fail']} value={form.fpCorticosteroids} onChange={v => up('fpCorticosteroids', v)} />
                                <FormField label="Skin Irritation Test (pass/fail)" type="select" options={['Pass', 'Fail']} value={form.fpSkinIrritation} onChange={v => up('fpSkinIrritation', v)} />
                                <FormField label="Dermal Toxicity Test (pass/fail)" type="select" options={['Pass', 'Fail']} value={form.fpDermalToxicity} onChange={v => up('fpDermalToxicity', v)} />
                                <FormField label="Finished Powder COA PDF (IPFS)" value={form.fpCoaPdf} onChange={v => up('fpCoaPdf', v)} />
                                <FormField label="Overall Result" type="select" options={['Approved', 'Rejected']} value={form.fpOverallResult} onChange={v => up('fpOverallResult', v)} />
                            </div>
                            <div className="form-actions">
                                <button className="btn-primary" onClick={() => setSection('dashboard')}>Unlock Packaging</button>
                            </div>
                        </div>
                    </div>
                );

            case 'packaging':
                // Check if unlocked: requires FP overall result to be Approved
                const isPkgLocked = form.fpOverallResult !== 'Approved';
                return (
                    <div className="portal-content">
                        <div className="product-header ph-cosmetics">
                            <div className="product-num">SUPPLY CHAIN 3</div>
                            <h1 className="product-title">PACKAGING & QR GENERATION</h1>
                        </div>
                        <div style={{ padding: '40px', maxWidth: 1200 }}>
                            {isPkgLocked && <div className="card" style={{ marginBottom: 20 }}><strong>Locked:</strong> Waiting for Finished Powder Testing Approval.</div>}
                            <div className="portal-form-grid" style={{ opacity: isPkgLocked ? 0.5 : 1, pointerEvents: isPkgLocked ? 'none' : 'auto' }}>
                                <FormField label="Powder Batch ID (scan)" value={form.prBatchNo} onChange={v => up('pkgBatchId', v)} />
                                <FormField label="Package Serial No. (auto)" value={form.pkgUnitSerialNo} readOnly />
                                <FormField label="Package Type (e.g. Paper Pouch, Jar)" value={form.pkgType} onChange={v => up('pkgType', v)} />
                                <FormField label="Weight (grams)" type="number" value={form.pkgWeight} onChange={v => up('pkgWeight', v)} />
                                <FormField label="MRP (₹)" type="number" value={form.pkgMrp} onChange={v => up('pkgMrp', v)} />
                                <FormField label="IPFS CID (auto)" value={"Qm..."} readOnly />
                                <FormField label="RSA Signature (auto)" value={"..."} readOnly />
                                <FormField label="TX Hash (auto)" value={"0x..."} readOnly />
                            </div>
                            <div className="form-actions">
                                <button className="btn-primary" onClick={() => setSection('dashboard')} disabled={isPkgLocked}>Generate Product QR</button>
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
        <PortalLayout categoryName="Cosmetic Powders" categoryStandards={std.authority} activeSection={section} onSectionChange={setSection} topbarTitle="Cosmetics Portal">
            {renderSection()}
        </PortalLayout>
    );
}
