"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type SpecialRole = "دبیر" | "نایب دبیر" | null;

type Member = {
  id: string;
  fullName: string;
  team: string;
  role: string; // نقش
  isHead: boolean; // هد تیم
  specialRole: SpecialRole; // دبیر | نایب دبیر | null
  avatarUrl?: string;
};

// نمونه داده اولیه (بعدا می‌توان از API پر کرد)
const members: Member[] = [
  {
    id: "1",
    fullName: "علی رضایی",
    team: "فنی",
    role: "توسعه‌دهنده فرانت‌اند",
    isHead: true,
    specialRole: null,
  },
  {
    id: "2",
    fullName: "مریم احمدی",
    team: "روابط عمومی",
    role: "مدیر شبکه‌های اجتماعی",
    isHead: false,
    specialRole: null,
  },
  {
    id: "3",
    fullName: "پویا صادقی",
    team: "فناوری",
    role: "DevOps",
    isHead: true,
    specialRole: null,
  },
  {
    id: "4",
    fullName: "نگین محمدی",
    team: "فنی",
    role: "تولید محتوا",
    isHead: false,
    specialRole: null,
  },
  {
    id: "5",
    fullName: "علی مقدسی",
    team: "",
    role: "دبیر رویداد",
    isHead: false,
    specialRole: "دبیر",
  },
  {
    id: "6",
    fullName: "پارسا فرج‌پور",
    team: "",
    role: "نایب دبیر رویداد",
    isHead: false,
    specialRole: "نایب دبیر",
  },
];

function classNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function RoleBadge({
  specialRole,
  isHead,
}: {
  specialRole: SpecialRole;
  isHead: boolean;
}) {
  if (specialRole === "دبیر") {
    return (
      <span className="inline-flex items-center rounded-full bg-primary-600 text-white px-3 py-1 text-xs font-semibold shadow-sm">
        دبیر
      </span>
    );
  }
  if (specialRole === "نایب دبیر") {
    return (
      <span className="inline-flex items-center rounded-full bg-primary-500/10 text-primary-700 px-3 py-1 text-xs font-semibold border border-primary-500/30">
        نایب دبیر
      </span>
    );
  }
  if (isHead) {
    return (
      <span className="inline-flex items-center rounded-full bg-accent-100 text-accent-800 px-2.5 py-1 text-xs font-medium border border-accent-200">
        هد تیم
      </span>
    );
  }
  return null;
}

function Avatar({
  member,
  size = "md",
}: {
  member: Member;
  size: "md" | "lg";
}) {
  const base = size === "lg" ? "size-40" : "size-24";
  const isSecretary = member.specialRole === "دبیر";
  const isDeputy = member.specialRole === "نایب دبیر";
  const isHead = member.isHead && !isSecretary && !isDeputy;

  // For now, use ali-moghadasi.jpg for all members
  // Later you can map member.id to specific image files
  const imageSrc = "/staff-pics/ali-moghadasi.jpg";

  return (
    <div
      className={classNames(
        "shrink-0 rounded-2xl overflow-hidden",
        base,
        isSecretary && "ring-4 ring-primary-600",
        isDeputy && "ring-4 ring-primary-500",
        isHead && "ring-2 ring-accent-400",
        !isSecretary && !isDeputy && !isHead && "ring-2 ring-primary-400"
      )}
    >
      <img
        src={imageSrc}
        alt={member.fullName}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to initials if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white font-bold ${
              size === "lg" ? "text-2xl" : "text-base"
            } ${
              isSecretary
                ? "bg-primary-600"
                : isDeputy
                ? "bg-primary-500"
                : isHead
                ? "bg-accent-400 text-accent-950"
                : "bg-primary-400"
            }">${member.fullName[0]}</div>`;
          }
        }}
      />
    </div>
  );
}

function TeamCard({ member }: { member: Member }) {
  const isSecretary = member.specialRole === "دبیر";
  const isDeputy = member.specialRole === "نایب دبیر";
  const isHead = member.isHead && !isSecretary && !isDeputy;

  return (
    <div
      className={classNames(
        "group relative rounded-2xl p-6 transition-shadow duration-200 border",
        "bg-white/80 backdrop-blur-md",
        isSecretary &&
          "border-primary-600 shadow-[0_8px_30px_rgba(50,129,77,0.25)]",
        isDeputy &&
          "border-primary-400/60 shadow-[0_8px_30px_rgba(50,129,77,0.15)]",
        isHead && "border-accent-200 shadow-sm",
        !isSecretary && !isDeputy && !isHead && "border-neutral-200 shadow-sm"
      )}
    >
      <div className="flex flex-col items-center text-center gap-4">
        <Avatar member={member} size="lg" />
        <div className="w-full">
          <div className="flex items-center justify-center gap-3">
            <h3 className="text-lg font-bold text-foreground truncate max-w-[16rem]">
              {member.fullName}
            </h3>
            <RoleBadge
              specialRole={member.specialRole}
              isHead={member.isHead}
            />
          </div>
          <div className="mt-1 text-sm text-neutral-600">
            <span className="font-medium text-neutral-800">نقش: </span>
            {member.role}
          </div>
          <div className="mt-1 text-sm text-neutral-600">
            <span className="font-medium text-neutral-800">تیم: </span>
            {member.team || "—"}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedCard({ member, label }: { member: Member; label: string }) {
  return (
    <div className="rounded-3xl p-6 border border-primary-500/30 bg-white shadow-[0_12px_40px_rgba(50,129,77,0.18)]">
      <div className="flex flex-col items-center text-center">
        <Avatar member={member} size="lg" />
        <div className="mt-4 flex items-center gap-2">
          <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
            {member.fullName}
          </h3>
          <span className="inline-flex items-center rounded-full bg-primary-600 text-white px-3 py-1 text-xs font-semibold">
            {label}
          </span>
        </div>
        <div className="mt-2 text-sm text-neutral-600">
          <span className="font-medium text-neutral-800">نقش: </span>
          {member.role}
        </div>
      </div>
    </div>
  );
}

export default function TeamPage() {
  // تفکیک دبیر و نایب دبیر
  const secretary = members.find((m) => m.specialRole === "دبیر") || null;
  const deputy = members.find((m) => m.specialRole === "نایب دبیر") || null;
  const others = members.filter((m) => m.specialRole === null);

  // گروه‌بندی بر اساس تیم
  const teams = others.reduce<Record<string, Member[]>>((acc, m) => {
    acc[m.team] = acc[m.team] || [];
    acc[m.team].push(m);
    return acc;
  }, {});

  // در هر تیم، اول هد و بعد بقیه
  const sortTeam = (arr: Member[]) => {
    const head = arr.find((m) => m.isHead);
    const rest = arr.filter((m) => !m.isHead);
    return head ? [head, ...rest] : rest;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-20">
        <section className="container-custom py-16">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              تیم برگزارکننده
            </h1>
            <p className="mt-3 text-neutral-600">
              اعضای تیم‌های مختلف کدوکدیل به همراه نقش‌ها. دبیر و نایب دبیر به
              صورت ویژه نمایش داده شده‌اند.
            </p>
          </header>

          {/* ویژه: دبیر و نایب دبیر */}
          {(secretary || deputy) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {secretary && <FeaturedCard member={secretary} label="دبیر" />}
              {deputy && <FeaturedCard member={deputy} label="نایب دبیر" />}
            </div>
          )}

          {/* تیم‌ها */}
          <div className="space-y-12">
            {Object.entries(teams).map(([teamName, teamMembers]) => {
              const ordered = sortTeam(teamMembers);
              const head = ordered[0]?.isHead ? ordered[0] : null;
              const rest = head ? ordered.slice(1) : ordered;
              return (
                <section
                  key={teamName}
                  className="border border-neutral-200 rounded-3xl p-6 bg-white/60 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                      تیم {teamName}
                    </h2>
                  </div>
                  {/* هد تیم */}
                  {head && (
                    <div className="mb-6">
                      <TeamCard member={head} />
                    </div>
                  )}
                  {/* سایر اعضا */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((m) => (
                      <TeamCard key={m.id} member={m} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
