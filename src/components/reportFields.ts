export const reportTypes = [
    { value: "trafficAccident", label: "Traffic Accident" },
    { value: "roadDamage", label: "Road Damage" },
    { value: "publicTransportIssue", label: "Public Transport Issue" },
    { value: "environmentalHazard", label: "Environmental Hazard" },
    { value: "trafficFlowIssue", label: "Traffic Flow Issue" },
];

const urgencyOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
];

export const getFieldsForType = (type: string) => {
    const commonFields = [
        { name: "description", label: "Description", type: "textarea", required: true },
        {
            name: "urgency",
            label: "Urgency",
            type: "select",
            options: urgencyOptions,
            required: true,
        },
    ];

    switch (type) {
        case "trafficAccident":
            return [
                {
                    name: "severity",
                    label: "Severity",
                    type: "select",
                    options: [
                        { value: "minor", label: "Minor" },
                        { value: "major", label: "Major" },
                        { value: "fatal", label: "Fatal" },
                    ],
                    required: true,
                },
                {
                    name: "involvedVehicles",
                    label: "Number of Vehicles Involved",
                    type: "number",
                    required: true,
                },
                { name: "injuries", label: "Injuries Reported", type: "checkbox" },
                {
                    name: "vehicleTypes",
                    label: "Types of Vehicles Involved",
                    type: "multiselect",
                    options: [
                        { value: "car", label: "Car" },
                        { value: "truck", label: "Truck" },
                        { value: "motorcycle", label: "Motorcycle" },
                        { value: "bicycle", label: "Bicycle" },
                        { value: "pedestrian", label: "Pedestrian" },
                    ],
                    required: true,
                },
                ...commonFields,
            ];
        case "roadDamage":
            return [
                {
                    name: "damageType",
                    label: "Type of Damage",
                    type: "select",
                    options: [
                        { value: "pothole", label: "Pothole" },
                        { value: "cracking", label: "Cracking" },
                        { value: "sinkhole", label: "Sinkhole" },
                        { value: "other", label: "Other" },
                    ],
                    required: true,
                },
                {
                    name: "damageSize",
                    label: "Approximate Size",
                    type: "slider",
                    min: 0,
                    max: 100,
                    step: 5,
                    unit: "cm",
                    required: true,
                },
                {
                    name: "affectedLanes",
                    label: "Affected Lanes",
                    type: "number",
                    min: 0,
                    max: 8,
                    required: true,
                },
                {
                    name: "weatherCondition",
                    label: "Current Weather",
                    type: "select",
                    options: [
                        { value: "dry", label: "Dry" },
                        { value: "wet", label: "Wet" },
                        { value: "icy", label: "Icy" },
                        { value: "snowy", label: "Snowy" },
                    ],
                    required: true,
                },
                ...commonFields,
            ];
        case "publicTransportIssue":
            return [
                {
                    name: "transportType",
                    label: "Transport Type",
                    type: "select",
                    options: [
                        { value: "bus", label: "Bus" },
                        { value: "train", label: "Train" },
                        { value: "subway", label: "Subway" },
                        { value: "other", label: "Other" },
                    ],
                    required: true,
                },
                { name: "lineNumber", label: "Line Number/Name", type: "text", required: true },
                {
                    name: "issueType",
                    label: "Issue Type",
                    type: "multiselect",
                    options: [
                        { value: "delay", label: "Delay" },
                        { value: "cancellation", label: "Cancellation" },
                        { value: "overcrowding", label: "Overcrowding" },
                        { value: "maintenance", label: "Maintenance" },
                        { value: "accessibility", label: "Accessibility" },
                    ],
                    required: true,
                },
                { name: "estimatedDelay", label: "Estimated Delay", type: "time", required: true },
                { name: "affectedStops", label: "Affected Stops", type: "tags", required: true },
                ...commonFields,
            ];
        case "environmentalHazard":
            return [
                {
                    name: "hazardType",
                    label: "Hazard Type",
                    type: "select",
                    options: [
                        { value: "spill", label: "Chemical Spill" },
                        { value: "airPollution", label: "Air Pollution" },
                        { value: "noise", label: "Excessive Noise" },
                        { value: "wildlife", label: "Wildlife on Road" },
                    ],
                    required: true,
                },
                {
                    name: "affectedArea",
                    label: "Affected Area",
                    type: "slider",
                    min: 0,
                    max: 1000,
                    step: 50,
                    unit: "m²",
                    required: true,
                },
                { name: "windDirection", label: "Wind Direction", type: "compass", required: true },
                {
                    name: "evacuationNeeded",
                    label: "Evacuation Needed",
                    type: "switch",
                    required: true,
                },
                {
                    name: "estimatedDuration",
                    label: "Estimated Duration",
                    type: "duration",
                    required: true,
                },
                ...commonFields,
            ];
        case "trafficFlowIssue":
            return [
                {
                    name: "issueType",
                    label: "Issue Type",
                    type: "select",
                    options: [
                        { value: "congestion", label: "Congestion" },
                        { value: "roadwork", label: "Roadwork" },
                        { value: "event", label: "Special Event" },
                        { value: "signalMalfunction", label: "Signal Malfunction" },
                    ],
                    required: true,
                },
                {
                    name: "affectedDirections",
                    label: "Affected Directions",
                    type: "select",
                    options: [
                        { value: "northbound", label: "Northbound" },
                        { value: "southbound", label: "Southbound" },
                        { value: "eastbound", label: "Eastbound" },
                        { value: "westbound", label: "Westbound" },
                    ],
                    required: true,
                    multiple: true,
                },
                {
                    name: "averageSpeed",
                    label: "Average Speed",
                    type: "slider",
                    min: 0,
                    max: 50,
                    step: 2.5,
                    unit: "km/h",
                    required: true,
                },
                {
                    name: "estimatedClearTime",
                    label: "Estimated Clear Time",
                    type: "datetime-local",
                    required: true,
                },
                {
                    name: "alternateRoutes",
                    label: "Alternate Routes",
                    type: "tags",
                    required: true,
                },
                ...commonFields,
            ];
        default:
            return commonFields;
    }
};
