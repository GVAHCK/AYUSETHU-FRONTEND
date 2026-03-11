import React from 'react';

export default function FormField({
    label,
    sublabel,
    type = 'text',
    unit,
    limit,
    authority,
    value,
    onChange,
    status,
    options,
    placeholder,
    required,
    readOnly,
    helper,
    rows,
    min,
    max,
    step,
    children,
    className = '',
    fullWidth = false,
}) {
    const getStatusDot = () => {
        if (status === 'pass') return <span className="field-status-dot pass" title="PASS">●</span>;
        if (status === 'fail') return <span className="field-status-dot fail" title="FAIL">●</span>;
        return null;
    };

    const renderInput = () => {
        if (type === 'select' && options) {
            return (
                <div className="field-input-wrap">
                    <select
                        className="field-input"
                        value={value || ''}
                        onChange={(e) => onChange && onChange(e.target.value)}
                        required={required}
                        disabled={readOnly}
                    >
                        <option value="">{placeholder || '-- Select --'}</option>
                        {options.map((opt, i) => {
                            const optVal = typeof opt === 'object' ? opt.value : opt;
                            const optLabel = typeof opt === 'object' ? opt.label : opt;
                            return <option key={i} value={optVal}>{optLabel}</option>;
                        })}
                    </select>
                    {getStatusDot()}
                </div>
            );
        }

        if (type === 'textarea') {
            return (
                <div className="field-input-wrap">
                    <textarea
                        className="field-input field-textarea"
                        value={value || ''}
                        onChange={(e) => onChange && onChange(e.target.value)}
                        placeholder={placeholder}
                        required={required}
                        readOnly={readOnly}
                        rows={rows || 3}
                    />
                    {getStatusDot()}
                </div>
            );
        }

        if (type === 'radio') {
            return (
                <div className="field-radio-group">
                    {options && options.map((opt, i) => {
                        const optVal = typeof opt === 'object' ? opt.value : opt;
                        const optLabel = typeof opt === 'object' ? opt.label : opt;
                        return (
                            <label key={i} className="field-radio-label">
                                <input
                                    type="radio"
                                    name={label}
                                    value={optVal}
                                    checked={value === optVal}
                                    onChange={() => onChange && onChange(optVal)}
                                />
                                <span>{optLabel}</span>
                            </label>
                        );
                    })}
                    {getStatusDot()}
                </div>
            );
        }

        if (type === 'checkbox-multi') {
            return (
                <div className="field-checkbox-group">
                    {options && options.map((opt, i) => {
                        const optVal = typeof opt === 'object' ? opt.value : opt;
                        const optLabel = typeof opt === 'object' ? opt.label : opt;
                        const checked = Array.isArray(value) ? value.includes(optVal) : false;
                        return (
                            <label key={i} className="field-checkbox-label">
                                <input
                                    type="checkbox"
                                    value={optVal}
                                    checked={checked}
                                    onChange={(e) => {
                                        if (!onChange) return;
                                        const arr = Array.isArray(value) ? [...value] : [];
                                        if (e.target.checked) arr.push(optVal);
                                        else {
                                            const idx = arr.indexOf(optVal);
                                            if (idx > -1) arr.splice(idx, 1);
                                        }
                                        onChange(arr);
                                    }}
                                />
                                <span>{optLabel}</span>
                            </label>
                        );
                    })}
                </div>
            );
        }

        return (
            <div className="field-input-wrap">
                <input
                    className="field-input"
                    type={type}
                    value={value ?? ''}
                    onChange={(e) => onChange && onChange(type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    readOnly={readOnly}
                    min={min}
                    max={max}
                    step={step}
                />
                {unit && <span className="field-unit">{unit}</span>}
                {getStatusDot()}
            </div>
        );
    };

    return (
        <div className={`form-field ${fullWidth ? 'form-field-full' : ''} ${className}`}>
            <div className="field-label-row">
                <label className="field-label">
                    {label}
                    {required && <span className="field-required">*</span>}
                </label>
                {authority && <span className="badge-green field-authority">{authority}</span>}
            </div>
            {sublabel && <span className="field-sublabel">{sublabel}</span>}
            {renderInput()}
            {children}
            {limit && <span className="field-limit">{limit}</span>}
            {helper && <span className="field-hint">{helper}</span>}
        </div>
    );
}
