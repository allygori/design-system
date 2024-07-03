import Toast from "../components/toast";
import Dialog from "../components/dialog";
import ActionSheet from "../components/action-sheet";

type Props = {
  className?: string;
};

const KitchensinkPage = ({ className = "" }: Props) => {
  return (
    <main className="h-[1500px] min-h-screen w-full bg-gray-200">
      <Toast />
      <Dialog />
      <ActionSheet />
    </main>
  );
};

export default KitchensinkPage;
