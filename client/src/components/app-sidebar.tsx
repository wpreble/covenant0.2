import { useQuery } from "@tanstack/react-query";
import info from "@/lib/info.json";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { apiClient } from "@/lib/api";
import { NavLink, useLocation } from "react-router";
import { type UUID } from "@elizaos/core";
import { Book, Cog, User } from "lucide-react";
import ConnectionStatus from "./connection-status";

export function AppSidebar() {
    const location = useLocation();
    const query = useQuery({
        queryKey: ["agents"],
        queryFn: () => apiClient.getAgents(),
        refetchInterval: 5_000,
    });

    const agents = query?.data?.agents;

    return (
        <Sidebar className="bg-black border-r border-white/10">
            <SidebarHeader className="border-b border-white/10">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-white/5">
                            <NavLink to="/">
                                <img
                                    src="/covlogo-white.png"
                                    width="100%"
                                    height="100%"
                                    className="size-8"
                                />
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-display text-lg tracking-tight">
                                        COVENANT
                                    </span>
                                    <span className="text-xs text-white/60 uppercase tracking-widest">
                                        v0.2
                                    </span>
                                </div>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-white/40 uppercase tracking-widest text-xs font-medium">
                        Agents
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {query?.isPending ? (
                                <div className="space-y-1">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <SidebarMenuItem key={index}>
                                            <SidebarMenuSkeleton className="bg-white/5" />
                                        </SidebarMenuItem>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {agents?.map((agent: { id: UUID; name: string }) => (
                                        <SidebarMenuItem key={agent.id}>
                                            <NavLink to={`/chat/${agent.id}`}>
                                                <SidebarMenuButton
                                                    isActive={location.pathname.includes(agent.id)}
                                                    className="hover:bg-white/5 transition-colors"
                                                >
                                                    <img
                                                        src={agent.name === "michael" ? "/avatars/michaelprofile.png" : "/covlogo-white.png"}
                                                        className="size-4 rounded-full ring-1 ring-white/10"
                                                        alt={agent.name}
                                                    />
                                                    <span className="capitalize">
                                                        {agent.name}
                                                    </span>
                                                </SidebarMenuButton>
                                            </NavLink>
                                        </SidebarMenuItem>
                                    ))}
                                </div>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="border-t border-white/10">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <NavLink to="https://covenantprotocol.com" target="_blank">
                            <SidebarMenuButton className="hover:bg-white/5 transition-colors">
                                <Book className="opacity-60" />
                                <span>Website</span>
                            </SidebarMenuButton>
                        </NavLink>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton disabled className="opacity-40">
                            <Cog />
                            <span>Settings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <ConnectionStatus />
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
