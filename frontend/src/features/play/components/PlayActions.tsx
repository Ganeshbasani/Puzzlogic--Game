import { motion } from "framer-motion";
import { SkipForward } from "lucide-react";

const PlayActions = ({ onSkip }: { onSkip: () => void }) => (
  <div className="mt-4">
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onSkip}
      className="btn-secondary-3d flex w-full items-center justify-center gap-2 py-4 font-semibold text-foreground"
      data-testid="button-skip"
    >
      <SkipForward size={18} /> Skip Question
    </motion.button>
  </div>
);

export default PlayActions;
