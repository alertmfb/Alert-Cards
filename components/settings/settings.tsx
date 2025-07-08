import { PageHeader } from "components/shared/PageHeader";
import ChangeAvatar from "./ChangeAvatar";
import PersonalDetailsSection from "./PersonalDetailsSection";
import { ChangePasswordButton } from "./ChangePasswordButton";
import { Enable2FAButton } from "./Enable2FAButton";

const SettingsPage = () => {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Account Settings"
        subText="Manage your profile details, and security settings. "
      />
      <ChangeAvatar name="Blaise Archibong" />
      <PersonalDetailsSection
        firstName="Archibong"
        lastName="Blaise"
        email="archibongblaise@gmail.com"
        dateOfBirth="1995-03-21"
      />
      <ChangePasswordButton />
      <Enable2FAButton />
    </div>
  );
};

export default SettingsPage;
