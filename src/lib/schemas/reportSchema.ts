import { z } from "zod";

const baseSchema = z.object({
    description: z.string().min(10, "Description must be at least 10 characters long"),
    urgency: z.enum(["low", "medium", "high"]),
});

const trafficAccidentSchema = baseSchema.extend({
    reportType: z.literal("trafficAccident"),
    severity: z.enum(["minor", "major", "fatal"]),
    involvedVehicles: z.number().min(1, "At least one vehicle must be involved"),
    injuries: z.boolean(),
    vehicleTypes: z
        .array(z.enum(["car", "truck", "motorcycle", "bicycle", "pedestrian"]))
        .min(1, "Select at least one vehicle type"),
});

const roadDamageSchema = baseSchema.extend({
    reportType: z.literal("roadDamage"),
    damageType: z.enum(["pothole", "cracking", "sinkhole", "other"]),
    damageSize: z.number().min(0).max(100),
    affectedLanes: z.number().min(0).max(8),
    weatherCondition: z.enum(["dry", "wet", "icy", "snowy"]),
});

const publicTransportIssueSchema = baseSchema.extend({
    reportType: z.literal("publicTransportIssue"),
    transportType: z.enum(["bus", "train", "subway", "other"]),
    lineNumber: z.string().min(1, "Line number is required"),
    issueType: z
        .array(z.enum(["delay", "cancellation", "overcrowding", "maintenance", "accessibility"]))
        .min(1, "Select at least one issue type"),
    estimatedDelay: z.string(),
    affectedStops: z.array(z.string()).min(1, "Add at least one affected stop"),
});

const environmentalHazardSchema = baseSchema.extend({
    reportType: z.literal("environmentalHazard"),
    hazardType: z.enum(["spill", "airPollution", "noise", "wildlife"]),
    affectedArea: z.number().min(0).max(1000),
    windDirection: z.number().min(0).max(359),
    evacuationNeeded: z.any(),
    estimatedDuration: z.object({
        hours: z.string(),
        minutes: z.string(),
    }),
});

const trafficFlowIssueSchema = baseSchema.extend({
    reportType: z.literal("trafficFlowIssue"),
    issueType: z.enum(["congestion", "roadwork", "event", "signalMalfunction"]),
    affectedDirections: z.enum(["northbound", "southbound", "eastbound", "westbound"]),
    averageSpeed: z.number().min(0).max(50),
    estimatedClearTime: z.string(),
    alternateRoutes: z.array(z.string()).min(1, "Add at least one alternate route"),
});

export const reportSchema = z.discriminatedUnion("reportType", [
    trafficAccidentSchema,
    roadDamageSchema,
    publicTransportIssueSchema,
    environmentalHazardSchema,
    trafficFlowIssueSchema,
]);

export type ReportFormData = z.infer<typeof reportSchema>;
