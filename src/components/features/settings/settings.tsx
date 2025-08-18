import { PageHeader } from "@/components/common/shared/PageHeader";
import ChangeAvatar from "./ChangeAvatar";
import PersonalDetailsSection from "./PersonalDetailsSection";
import { ChangePasswordButton } from "./ChangePasswordButton";
import { Enable2FAButton } from "./Enable2FAButton";
import { useAuth } from "@/hooks";

const SettingsPage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Account Settings"
        subText="Manage your profile details, and security settings. "
      />
      <ChangeAvatar name={user?.firstName as string} />
      <PersonalDetailsSection
        firstName={user?.firstName as string}
        lastName={user?.lastName as string}
        email={user?.email as string}
      />
      <ChangePasswordButton />
      <Enable2FAButton />
    </div>
  );
};

export default SettingsPage;
