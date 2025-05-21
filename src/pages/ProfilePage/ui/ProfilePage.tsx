import { memo } from "react";
import { Page } from "widgets/Page/Page";
import { EditProfileCard } from "features/EditProfileCard";
import { useParams } from "react-router-dom";
import { Text } from "shared/Text";

const ProfilePage = () => {
  const { id } = useParams<{id: string}>();

  if (!id) {
    return <Text text="Error with profile ID" />;
  }

  return (
    <Page>
      <EditProfileCard id={id} />
    </Page>
  );
};

export default memo(ProfilePage);
