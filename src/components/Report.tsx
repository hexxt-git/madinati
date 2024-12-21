"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import "leaflet/dist/leaflet.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Phone, AlertTriangle, Info } from "lucide-react";

import { MapComponent } from "./MapInput";
import { reportTypes, getFieldsForType } from "./reportFields";
import { reportSchema, ReportFormData } from "./schemas/reportSchema";
function EmergencyNumbers() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="link"
                    className="text-red-500 hover:text-red-600 ms-auto font-semibold">
                    Emergency Contacts
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-red-600">
                        Emergency Contacts
                    </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <a
                        href="tel:14"
                        className="flex items-center space-x-4 bg-red-100 p-3 rounded-lg">
                        <Phone className="h-6 w-6 text-red-600" />
                        <div>
                            <p className="font-semibold">General Emergency</p>
                            <p className="text-2xl font-bold">14</p>
                        </div>
                    </a>
                    <a
                        href="tel:1548"
                        className="flex items-center space-x-4 bg-blue-100 p-3 rounded-lg">
                        <AlertTriangle className="h-6 w-6 text-blue-600" />
                        <div>
                            <p className="font-semibold">Police</p>
                            <p className="text-2xl font-bold">1548</p>
                        </div>
                    </a>
                    <a
                        href="tel:1055"
                        className="flex items-center space-x-4 bg-green-200 p-3 rounded-lg">
                        <AlertTriangle className="h-6 w-6 text-green-700" />
                        <div>
                            <p className="font-semibold">Gendarme (inter-city/rural police)</p>
                            <p className="text-2xl font-bold">1055</p>
                        </div>
                    </a>
                    <a
                        href="tel:14"
                        className="flex items-center space-x-4 bg-purple-100 p-3 rounded-lg">
                        <Info className="h-6 w-6 text-purple-600" />
                        <div>
                            <p className="font-semibold">Fire Brigade</p>
                            <p className="text-2xl font-bold">14</p>
                        </div>
                    </a>
                    <a
                        href="tel:14"
                        className="flex items-center space-x-4 bg-yellow-100 p-3 rounded-lg">
                        <Info className="h-6 w-6 text-yellow-600" />
                        <div>
                            <p className="font-semibold">Ambulance</p>
                            <p className="text-2xl font-bold">14</p>
                        </div>
                    </a>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default function Report() {
    const [isOpen, setIsOpen] = useState(false);
    const [reportType, setReportType] = useState("");
    const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const titles = [
        "traffic issues?",
        "having trouble?",
        "slow traffic?",
        "road blockages?",
        "accidents?",
        "construction work?",
        "road hazards?",
        "illegal parking?",
        "potholes?",
        "missing road signs?",
        "flooded streets?",
        "broken traffic lights?",
        "animal on the road?",
        "debris on the road?",
        "fallen trees?",
        "road rage incidents?",
        "dangerous driving?",
        "other issues?",
    ];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm<ReportFormData>({
        resolver: zodResolver(reportSchema),
    });

    useEffect(() => {
        if (reportType) {
            setValue("reportType", reportType as any);
        }
    }, [reportType, setValue]);

    const onSubmit = async (data: ReportFormData) => {
        setIsSubmitting(true);
        try {
            // await axios.post("/api/report", { ...data, location });
            console.dir({ ...data, location }, { depth: null });
            await new Promise((resolve) => setTimeout(resolve, 2000));
            toast.success("Report submitted successfully!");
            setIsOpen(false);
            setReportType("");
            reset();
        } catch {
            toast.error("Failed to submit report. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderField = (field: any) => {
        switch (field.type) {
            case "select":
                return (
                    <Select onValueChange={(value) => setValue(field.name, value)}>
                        <SelectTrigger>
                            <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                            {field.options.map((option: any) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            case "textarea":
                return <Textarea {...register(field.name)} className="h-32" />;
            case "checkbox":
                return (
                    <div className="flex items-center space-x-2">
                        <Checkbox {...register(field.name)} />
                        <label className="text-sm font-medium">{field.label}</label>
                    </div>
                );
            case "multiselect":
                return (
                    <div className="space-y-2">
                        {field.options.map((option: any) => (
                            <div key={option.value} className="flex items-center space-x-2">
                                <Checkbox {...register(field.name)} value={option.value} />
                                <label className="text-sm font-medium">{option.label}</label>
                            </div>
                        ))}
                    </div>
                );
            case "slider":
                return (
                    <div className="space-y-2">
                        <Slider
                            min={field.min}
                            max={field.max}
                            step={field.step}
                            onValueChange={([value]) => setValue(field.name, value)}
                        />
                        <div className="text-sm text-gray-500">
                            {watch(field.name) || field.min} {field.unit}
                        </div>
                    </div>
                );
            case "switch":
                return (
                    <div className="flex items-center space-x-2">
                        <Switch {...register(field.name)} />
                        <label className="text-sm font-medium">{field.label}</label>
                    </div>
                );
            case "time":
            case "datetime-local":
                return <Input type={field.type} {...register(field.name)} />;
            case "tags":
                return (
                    <div className="space-y-2">
                        <Input
                            type="text"
                            placeholder="Add tag and press Enter"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && e.currentTarget.value) {
                                    e.preventDefault();
                                    const currentTags = watch(field.name) || [];
                                    setValue(field.name, [...currentTags, e.currentTarget.value]);
                                    e.currentTarget.value = "";
                                }
                            }}
                        />
                        <div className="flex flex-wrap gap-2">
                            {(watch(field.name) || []).map((tag: any, index: number) => (
                                <div
                                    key={index}
                                    className="bg-gray-200 px-2 py-1 rounded-full text-sm flex items-center">
                                    {tag}
                                    <button
                                        type="button"
                                        className="ml-1"
                                        onClick={() => {
                                            const newTags = (watch(field.name) || []).filter(
                                                (_: any, i: number) => i !== index
                                            );
                                            setValue(field.name, newTags);
                                        }}>
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case "compass":
                return (
                    <div className="space-y-2">
                        <Input
                            type="range"
                            min="0"
                            max="359"
                            {...register(field.name, { valueAsNumber: true })}
                        />
                        <div className="text-sm text-gray-500">{watch(field.name) || 0}°</div>
                    </div>
                );
            case "duration":
                return (
                    <div className="flex space-x-2">
                        <Input
                            type="number"
                            placeholder="Hours"
                            {...register(`${field.name}.hours` as any)}
                            className="w-20"
                        />
                        <Input
                            type="number"
                            placeholder="Minutes"
                            {...register(`${field.name}.minutes` as any)}
                            className="w-20"
                        />
                    </div>
                );
            case "number":
                return <Input type="number" {...register(field.name, { valueAsNumber: true })} />;
            default:
                return <Input type={field.type} {...register(field.name)} />;
        }
    };

    if (!isOpen) {
        return (
            <div
                className="fixed z-50 top-0 right-[15%] pb-1 px-6 bg-red-500 hover:pt-3 hover:pb-4 transition-all rounded-b-[20px] font-bold text-white cursor-pointer text-lg"
                onClick={() => setIsOpen(true)}>
                {randomTitle}
            </div>
        );
    }

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <Card className="w-full max-w-5xl max-h-[95vh] overflow-scroll">
                    <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row h-full">
                            <div className="md:w-1/2 p-6 overflow-y-auto">
                                <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold">
                                        Report a Transportation Issue
                                    </h2>
                                    <EmergencyNumbers />
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div>
                                        <Label>Type of Report</Label>
                                        <Select onValueChange={(value) => setReportType(value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select report type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {reportTypes.map((type) => (
                                                    <SelectItem key={type.value} value={type.value}>
                                                        {type.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {reportType && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {getFieldsForType(reportType).map((field) => (
                                                <div
                                                    key={field.name}
                                                    className={
                                                        field.type === "textarea"
                                                            ? "col-span-full"
                                                            : ""
                                                    }>
                                                    <Label>{field.label}</Label>
                                                    {renderField(field)}
                                                    {errors[field.name as keyof typeof errors] && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {
                                                                errors[
                                                                    field.name as keyof typeof errors
                                                                ]?.message as string
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex justify-end space-x-2 pt-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setIsOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? "Submitting..." : "Submit Report"}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                            <div className="md:w-1/2 bg-gray-100">
                                <div className="full max-h-70vh overflow-hidden">
                                    <MapComponent onLocationSelect={setLocation} />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Selected Location
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Latitude: {location.lat.toFixed(6)}, Longitude:{" "}
                                        {location.lng.toFixed(6)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
