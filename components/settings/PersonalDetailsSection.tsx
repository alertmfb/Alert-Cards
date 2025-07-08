import React from "react";
import { Card, CardContent } from "components/ui/card";

interface PersonalDetailsSectionProps {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
}

const InputLikeDisplay = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-muted-foreground">{label}</label>
    <div className="w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm text-foreground shadow-sm">
      {value}
    </div>
  </div>
);

const PersonalDetailsSection: React.FC<PersonalDetailsSectionProps> = ({
  firstName,
  lastName,
  email,
  dateOfBirth,
}) => {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Personal Details</h2>

      <Card>
        <CardContent className="px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputLikeDisplay label="First Name" value={firstName} />
            <InputLikeDisplay label="Last Name" value={lastName} />
            <InputLikeDisplay label="Email Address" value={email} />
            <InputLikeDisplay label="Date of Birth" value={dateOfBirth} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PersonalDetailsSection;
