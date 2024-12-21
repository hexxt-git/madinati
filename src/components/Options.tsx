import { Card } from "./ui/card";
import { Slider } from "./ui/slider";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { toast } from "sonner";

export default function Options() {
  const handleChange = () => {
    toast.info("options are still a work in progress");
  };

  return (
    <Card className="p-4 space-y-6">
      <h2 className="font-bold text-lg">Options ⚙️</h2>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold">Walking Preferences</h3>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Maximum Walking Distance</label>
            <Slider 
              defaultValue={[1400]}
              max={2000}
              step={100}
              className="w-full"
              onValueChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Walking Speed (km/h)</label>
            <Slider  
              defaultValue={[4]}
              max={7}
              step={0.5}
              className="w-full"
              onValueChange={handleChange}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-semibold">Priority Weights</h3>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Time vs Cost Balance</label>
            <Slider 
              defaultValue={[50]}
              max={100}
              step={10}
              className="w-full"
              onValueChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Prefer Direct Routes</label>
            <Slider 
              defaultValue={[70]}
              max={100}
              step={10}
              className="w-full"
              onValueChange={handleChange}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-semibold">Transport Modes</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Bus</Label>
                <p className="text-sm text-muted-foreground">Include bus routes in path finding</p>
              </div>
              <Switch defaultChecked onCheckedChange={handleChange} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Tram</Label>
                <p className="text-sm text-muted-foreground">Include tram routes in path finding</p>
              </div>
              <Switch defaultChecked onCheckedChange={handleChange} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Metro</Label>
                <p className="text-sm text-muted-foreground">Include metro routes in path finding</p>
              </div>
              <Switch defaultChecked onCheckedChange={handleChange} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cable Car</Label>
                <p className="text-sm text-muted-foreground">Include cable car routes in path finding</p>
              </div>
              <Switch defaultChecked onCheckedChange={handleChange} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}