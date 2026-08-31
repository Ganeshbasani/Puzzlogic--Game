const LoadingScreen = ({ label = "Loading the next move..." }: { label?: string }) => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

export default LoadingScreen;
