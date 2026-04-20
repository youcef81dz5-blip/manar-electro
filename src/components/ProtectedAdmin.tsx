import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

export const ProtectedAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, loading } = useAuth();
  if (loading) {
    return (
      <div className="container py-20 grid place-items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">لا تملك صلاحية الوصول</h1>
        <p className="text-muted-foreground">
          هذا الحساب ليس Admin. يرجى التواصل مع مالك المحل لمنحك الصلاحية.
        </p>
        <p className="text-xs text-muted-foreground mt-4">
          User ID: <code className="bg-secondary px-2 py-0.5 rounded">{user.id}</code>
        </p>
      </div>
    );
  }
  return <>{children}</>;
};
