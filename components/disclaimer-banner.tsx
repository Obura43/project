import { AlertTriangle } from 'lucide-react';

export function DisclaimerBanner() {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <div className="text-sm text-amber-800">
          <p className="font-medium">Disclaimer</p>
          <p className="mt-1">
            EasyGov Kenya is an independent informational website. We are not affiliated with the
            Government of Kenya, eCitizen, KRA, NTSA, HELB, BRS, SHA, or any public agency. Always
            confirm final requirements, fees, and application status on the official government portals.
          </p>
        </div>
      </div>
    </div>
  );
}
