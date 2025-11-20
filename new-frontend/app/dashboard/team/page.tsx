"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { teamAPI, challengerAPI } from "@/lib/api";
import {
  UserPlusIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface TeamMember {
  challenger: {
    id: number;
    first_name_persian: string;
    last_name_persian: string;
    status: string;
    university?: string;
    user: {
      first_name: string;
      last_name: string;
    };
  };
  role: "L" | "M";
  status: "A" | "P" | "R";
}

interface Team {
  id: number;
  name: string;
  description: string;
  judge_username?: string;
  judge_password?: string;
  members: TeamMember[];
}

interface Invitation {
  id: number;
  group: Team;
}

interface SearchChallenger {
  id: number;
  first_name_persian: string;
  last_name_persian: string;
  university?: string;
  status: string;
  user: {
    first_name: string;
    last_name: string;
  };
}

export default function TeamManagement() {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [team, setTeam] = useState<Team | null>(null);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState<SearchChallenger[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [isUpdatingTeam, setIsUpdatingTeam] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/sign-in");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      loadTeam();
      loadInvitations();
    }
  }, [isAuthenticated]);

  const loadTeam = async () => {
    try {
      const teamData = await teamAPI.getTeam();
      console.log("Team data loaded:", teamData);
      console.log("Team members count:", teamData?.members?.length);
      console.log("Team members:", teamData?.members);
      setTeam(teamData);
      // Initialize edit form with current team data
      if (teamData) {
        setTeamName(teamData.name || "");
        setTeamDescription(teamData.description || "");
      }
    } catch (error: any) {
      if (error.response?.status !== 404) {
        setError("خطا در بارگذاری اطلاعات تیم");
      }
      setTeam(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTeam = async () => {
    if (!team) return;

    setIsUpdatingTeam(true);
    setError("");
    try {
      const updatedTeam = await teamAPI.updateTeam({
        name: teamName,
        description: teamDescription,
      });
      setTeam(updatedTeam);
      setIsEditingTeam(false);
    } catch (error: any) {
      setError(
        error.response?.data?.detail ||
          error.response?.data?.errors?.[0]?.detail ||
          "خطا در بروزرسانی تیم"
      );
    } finally {
      setIsUpdatingTeam(false);
    }
  };

  const loadInvitations = async () => {
    try {
      const invitationsData = await teamAPI.getInvitations();
      setInvitations(invitationsData.results || invitationsData);
    } catch (error: any) {
      console.error("Failed to load invitations:", error);
    }
  };

  const handleCreateTeam = async () => {
    setIsCreating(true);
    setError("");
    try {
      const newTeam = await teamAPI.createTeam();
      setTeam(newTeam);
    } catch (error: any) {
      setError(
        error.response?.data?.detail ||
          error.response?.data?.errors?.[0]?.detail ||
          "خطا در ایجاد تیم"
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleAcceptInvitation = async (invitationId: number) => {
    try {
      await teamAPI.acceptInvitation(invitationId, "A");
      // Refresh team and invitations after accepting
      await Promise.all([loadTeam(), loadInvitations()]);
    } catch (error: any) {
      setError(
        error.response?.data?.detail ||
          error.response?.data?.errors?.[0]?.detail ||
          "خطا در پذیرش دعوت"
      );
    }
  };

  const handleRejectInvitation = async (invitationId: number) => {
    try {
      await teamAPI.acceptInvitation(invitationId, "R");
      await loadInvitations();
    } catch (error: any) {
      setError(
        error.response?.data?.detail ||
          error.response?.data?.errors?.[0]?.detail ||
          "خطا در رد دعوت"
      );
    }
  };

  const handleLeaveTeam = async () => {
    if (!team) return;

    // Confirm before leaving
    const confirmed = window.confirm(
      "آیا مطمئن هستید که می‌خواهید از تیم خارج شوید؟"
    );
    if (!confirmed) return;

    try {
      await teamAPI.deleteTeam();
      setTeam(null);
      setError("");
      // Refresh invitations in case there are new ones
      await loadInvitations();
    } catch (error: any) {
      setError(
        error.response?.data?.detail ||
          error.response?.data?.errors?.[0]?.detail ||
          "خطا در خروج از تیم"
      );
    }
  };

  const handleOpenJudge = () => {
    window.open("https://judge.codocodile.ir/login", "_blank");
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSearch = async (name: string) => {
    if (name.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setSearchError("");
    try {
      console.log("Searching for:", name);
      const results = await challengerAPI.searchChallenger(name);
      console.log("Search results:", results);
      const searchResultsArray = Array.isArray(results)
        ? results
        : results.results || [];
      console.log("Processed results:", searchResultsArray);
      setSearchResults(searchResultsArray);
    } catch (error: any) {
      console.error("Search error:", error);
      setSearchError(
        error.response?.data?.detail ||
          error.response?.data?.errors?.[0]?.detail ||
          "خطا در جستجو"
      );
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const debouncedSearch = (name: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      handleSearch(name);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handleSendInvitation = async (challengerId: number) => {
    try {
      // If no team exists, create one first
      if (!team) {
        try {
          const newTeam = await teamAPI.createTeam();
          setTeam(newTeam);
          // Wait a moment for team to be fully created
          await new Promise((resolve) => setTimeout(resolve, 500));
        } catch (createError: any) {
          setError(
            createError.response?.data?.detail ||
              createError.response?.data?.errors?.[0]?.detail ||
              "خطا در ایجاد تیم"
          );
          return;
        }
      }

      // Now send the invitation
      await teamAPI.sendInvitation(challengerId);
      setError("");
      // Refresh team to show updated state
      await loadTeam();
      setSearchResults([]);
      setSearchName("");
    } catch (error: any) {
      setError(
        error.response?.data?.detail ||
          error.response?.data?.errors?.[0]?.detail ||
          "خطا در ارسال دعوت"
      );
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  // Check if profile is complete - national_code must be non-empty and user must be confirmed
  // national_code can be null, undefined, or empty string - all are invalid
  const nationalCode = user?.national_code;
  const hasNationalCode =
    nationalCode !== null &&
    nationalCode !== undefined &&
    typeof nationalCode === "string" &&
    nationalCode.trim() !== "";
  const isProfileComplete = hasNationalCode && user?.is_confirmed === true;
  const canCreateTeam = !team && isProfileComplete;

  // Debug: Log profile status (remove in production)
  if (user && !team) {
    console.log("Profile check:", {
      hasNationalCode,
      isConfirmed: user.is_confirmed,
      nationalCode: nationalCode,
      isProfileComplete,
      canCreateTeam,
    });
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-hero">
      <Header />
      <main className="flex-1 pt-16 lg:pt-20 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              مدیریت تیم
            </h1>
            <p className="text-neutral-600">
              تیم خود را تشکیل دهید و مدیریت کنید
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {!canCreateTeam && !team && user && (
            <div className="card p-6 mb-6">
              <div className="text-center space-y-3">
                {!user.is_confirmed && (
                  <div>
                    <p className="text-red-600 mb-2">
                      لطفاً ابتدا ایمیل خود را تایید کنید
                    </p>
                    <p className="text-sm text-neutral-600">
                      برای تایید ایمیل، به ایمیل خود مراجعه کنید و کد تایید را
                      وارد کنید
                    </p>
                  </div>
                )}
                {!hasNationalCode && (
                  <div>
                    <p className="text-red-600 mb-2">
                      لطفاً ابتدا پروفایل خود را تکمیل کنید
                    </p>
                    <p className="text-sm text-neutral-600 mb-3">
                      برای تشکیل تیم، باید کد ملی خود را در پروفایل وارد کنید
                    </p>
                    <a
                      href="/profile"
                      className="btn btn-primary btn-sm inline-block"
                    >
                      رفتن به پروفایل
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {team ? (
            <div className="space-y-6">
              {/* Team Info */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  اطلاعات تیم
                </h2>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-foreground">
                        نام تیم
                      </label>
                      {!isEditingTeam && (
                        <button
                          type="button"
                          onClick={() => setIsEditingTeam(true)}
                          className="btn btn-outline btn-sm"
                        >
                          ویرایش
                        </button>
                      )}
                    </div>
                    {isEditingTeam ? (
                      <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        className="input"
                        placeholder="نام تیم"
                      />
                    ) : (
                      <input
                        type="text"
                        value={team.name}
                        disabled
                        className="input"
                      />
                    )}
                  </div>

                  {team.judge_username && team.judge_password && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Judge Username
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={team.judge_username}
                            readOnly
                            className="input flex-1 bg-neutral-50"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              copyToClipboard(team.judge_username!, "username")
                            }
                            className="btn btn-outline"
                          >
                            {copiedField === "username" ? "کپی شد!" : "کپی"}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Judge Password
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={team.judge_password}
                            readOnly
                            className="input flex-1 bg-neutral-50"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              copyToClipboard(team.judge_password!, "password")
                            }
                            className="btn btn-outline"
                          >
                            {copiedField === "password" ? "کپی شد!" : "کپی"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      توضیحات
                    </label>
                    {isEditingTeam ? (
                      <textarea
                        value={teamDescription}
                        onChange={(e) => setTeamDescription(e.target.value)}
                        rows={4}
                        className="input"
                        placeholder="توضیحات تیم"
                      />
                    ) : (
                      <textarea
                        value={team.description}
                        disabled
                        rows={4}
                        className="input"
                      />
                    )}
                  </div>

                  {isEditingTeam ? (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleUpdateTeam}
                        disabled={isUpdatingTeam}
                        className="btn btn-primary flex-1"
                      >
                        {isUpdatingTeam ? (
                          <div className="flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 rtl:ml-2"></div>
                            در حال ذخیره...
                          </div>
                        ) : (
                          "ذخیره تغییرات"
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditingTeam(false);
                          setTeamName(team.name || "");
                          setTeamDescription(team.description || "");
                        }}
                        className="btn btn-outline flex-1"
                      >
                        انصراف
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleOpenJudge}
                      className="btn btn-primary w-full"
                    >
                      رفتن به Online Judge
                    </button>
                  )}
                </div>
              </div>

              {/* Team Members */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  اعضای تیم ({team.members.length} نفر)
                </h2>
                <div className="space-y-4">
                  {team.members && team.members.length > 0 ? (
                    team.members.map((member) => (
                      <div
                        key={member.challenger.id}
                        className="p-4 bg-neutral-50 rounded-xl border border-neutral-200"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-foreground">
                              {member.challenger.first_name_persian}{" "}
                              {member.challenger.last_name_persian}
                            </p>
                            <p className="text-sm text-neutral-600">
                              {member.challenger.university || "—"}
                            </p>
                            <p className="text-sm text-neutral-600">
                              سطح:{" "}
                              {member.challenger.status === "J"
                                ? "Junior"
                                : member.challenger.status === "S"
                                ? "Senior"
                                : "Pro"}
                            </p>
                          </div>
                          {member.role === "L" && (
                            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                              رهبر تیم
                            </span>
                          )}
                          {member.role === "M" && (
                            <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                              عضو
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-neutral-600 text-center py-4">
                      هیچ عضوی در تیم وجود ندارد
                    </p>
                  )}
                </div>
              </div>

              {/* Leave Team Button */}
              <div className="card p-8 border-red-200 bg-red-50/50">
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-neutral-700 text-center font-medium">
                    می‌خواهید از تیم خارج شوید؟
                  </p>
                  <button
                    type="button"
                    onClick={handleLeaveTeam}
                    className="btn border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white focus:ring-red-500 w-full md:w-auto px-6 py-3"
                  >
                    خروج از تیم
                  </button>
                </div>
              </div>

              {/* Search and Invite Section - Only show if team has less than 2 members */}
              {team.members && team.members.length < 2 && (
                <div className="card p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    جستجو و دعوت هم‌تیمی
                  </h2>

                  {searchError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                      {searchError}
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      جستجوی شرکت‌کننده (حداقل ۳ کاراکتر)
                    </label>
                    <input
                      type="text"
                      value={searchName}
                      onChange={(e) => {
                        setSearchName(e.target.value);
                        debouncedSearch(e.target.value);
                      }}
                      className="input w-full"
                      placeholder="نام یا نام خانوادگی..."
                    />
                  </div>

                  {isSearching && (
                    <div className="text-center py-4">
                      <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                  )}

                  {searchResults.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">
                        نتایج جستجو:
                      </h3>
                      {searchResults.map((challenger) => (
                        <div
                          key={challenger.id}
                          className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium text-foreground">
                              {challenger.first_name_persian}{" "}
                              {challenger.last_name_persian}
                            </p>
                            <p className="text-sm text-neutral-600">
                              {challenger.user.first_name}{" "}
                              {challenger.user.last_name}
                            </p>
                            <p className="text-sm text-neutral-600">
                              {challenger.university || "—"}
                            </p>
                            <div className="flex gap-1 mt-1">
                              <span className="text-xs">⭐</span>
                              {challenger.status === "S" && (
                                <span className="text-xs">⭐</span>
                              )}
                              {challenger.status === "P" && (
                                <>
                                  <span className="text-xs">⭐</span>
                                  <span className="text-xs">⭐</span>
                                </>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleSendInvitation(challenger.id)}
                            className="btn btn-primary btn-sm flex items-center gap-2"
                          >
                            <UserPlusIcon className="w-5 h-5" />
                            ارسال دعوت
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchName.length >= 3 &&
                    !isSearching &&
                    searchResults.length === 0 && (
                      <div className="text-center py-4 text-neutral-600">
                        نتیجه‌ای یافت نشد
                      </div>
                    )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Invitations */}
              {invitations.length > 0 && (
                <div className="card p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    دعوت‌نامه‌های دریافتی
                  </h2>
                  <div className="space-y-4">
                    {invitations.map((invitation) => (
                      <div
                        key={invitation.id}
                        className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium text-foreground">
                            {invitation.group.name}
                          </p>
                          <p className="text-sm text-neutral-600">
                            {invitation.group.description || "بدون توضیحات"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleAcceptInvitation(invitation.id)
                            }
                            className="btn btn-primary btn-sm"
                          >
                            پذیرش
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleRejectInvitation(invitation.id)
                            }
                            className="btn btn-outline btn-sm"
                          >
                            رد
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Search and Invite Section - Show when no team but profile is complete */}
              {canCreateTeam && (
                <div className="card p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    جستجو و دعوت هم‌تیمی
                  </h2>
                  <p className="text-neutral-600 mb-6">
                    ابتدا یک تیم تشکیل دهید یا هم‌تیمی خود را پیدا کنید. در صورت
                    ارسال دعوت به کسی که تیم ندارد، تیم به صورت خودکار ایجاد
                    می‌شود.
                  </p>

                  {searchError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                      {searchError}
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      جستجوی شرکت‌کننده (حداقل ۳ کاراکتر)
                    </label>
                    <input
                      type="text"
                      value={searchName}
                      onChange={(e) => {
                        setSearchName(e.target.value);
                        debouncedSearch(e.target.value);
                      }}
                      className="input w-full"
                      placeholder="نام یا نام خانوادگی..."
                    />
                  </div>

                  {isSearching && (
                    <div className="text-center py-4">
                      <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                  )}

                  {searchResults.length > 0 && (
                    <div className="space-y-3 mb-6">
                      <h3 className="text-lg font-semibold text-foreground">
                        نتایج جستجو:
                      </h3>
                      {searchResults.map((challenger) => (
                        <div
                          key={challenger.id}
                          className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex justify-between items-center"
                        >
                          <div>
                            <p className="font-medium text-foreground">
                              {challenger.first_name_persian}{" "}
                              {challenger.last_name_persian}
                            </p>
                            <p className="text-sm text-neutral-600">
                              {challenger.user.first_name}{" "}
                              {challenger.user.last_name}
                            </p>
                            <p className="text-sm text-neutral-600">
                              {challenger.university || "—"}
                            </p>
                            <div className="flex gap-1 mt-1">
                              <span className="text-xs">⭐</span>
                              {challenger.status === "S" && (
                                <span className="text-xs">⭐</span>
                              )}
                              {challenger.status === "P" && (
                                <>
                                  <span className="text-xs">⭐</span>
                                  <span className="text-xs">⭐</span>
                                </>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleSendInvitation(challenger.id)}
                            className="btn btn-primary btn-sm flex items-center gap-2"
                          >
                            <UserPlusIcon className="w-5 h-5" />
                            ارسال دعوت
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchName.length >= 3 &&
                    !isSearching &&
                    searchResults.length === 0 && (
                      <div className="text-center py-4 text-neutral-600 mb-6">
                        نتیجه‌ای یافت نشد
                      </div>
                    )}

                  {/* Create Team Button */}
                  <div className="border-t border-neutral-200 pt-6 mt-6">
                    <p className="text-neutral-600 mb-4 text-center">
                      یا می‌توانید ابتدا تیم خود را تشکیل دهید:
                    </p>
                    <button
                      type="button"
                      onClick={handleCreateTeam}
                      disabled={isCreating}
                      className="btn btn-primary btn-lg w-full"
                    >
                      {isCreating ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 rtl:ml-2"></div>
                          در حال ایجاد...
                        </div>
                      ) : (
                        "تشکیل تیم"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
