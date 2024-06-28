import ToastComponent from "../components/toast";

type Props = {
  className?: string;
};

const KitchensinkPage = ({ className = "" }: Props) => {
  return (
    <main className="h-[1500px] min-h-screen w-full bg-gray-200">
      <ToastComponent />
    </main>
  );
};

export default KitchensinkPage;
