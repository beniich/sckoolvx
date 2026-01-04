import { useUserStore } from "@/store/useUserStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Mail, Building } from "lucide-react";

export const WelcomeWidget = () => {
  const { user, profile, stats } = useUserStore();
  
  const displayName = profile?.full_name || user?.email?.split("@")[0] || "Utilisateur";
  const initials = displayName.slice(0, 2).toUpperCase();
  
  const lastActive = stats?.last_active
    ? new Date(stats.last_active).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "Première connexion";

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-16 w-16 shadow-neu">
        <AvatarImage src={profile?.avatar_url || undefined} alt={displayName} />
        <AvatarFallback className="bg-primary text-primary-foreground text-lg">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold truncate">Bonjour, {displayName}</h3>
        <div className="flex flex-wrap gap-2 mt-1">
          {profile?.company && (
            <Badge variant="secondary" className="text-xs">
              <Building className="h-3 w-3 mr-1" />
              {profile.company}
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            <CalendarDays className="h-3 w-3 mr-1" />
            {lastActive}
          </Badge>
        </div>
        {user?.email && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 truncate">
            <Mail className="h-3 w-3" />
            {user.email}
          </p>
        )}
      </div>
    </div>
  );
};
