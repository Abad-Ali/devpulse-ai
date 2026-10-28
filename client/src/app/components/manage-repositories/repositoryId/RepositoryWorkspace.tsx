"use client";
import RepositoryManagement from "./RepositoryManagement";
import RepositoryOverview from "./RepositoryOverview";

interface RepositoryWorkspaceProps {
  repository: {
    _id: string;
    repositoryId: string;
    repositoryName: string;
    fullName: string;
    description?: string;
    repositoryUrl: string;
    visibility: "public" | "private";
    defaultBranch?: string;
    githubRepoCreatedAt?: string | Date | null;
    createdAt?: string | Date;
    updatedAt?: string | Date;
  };
}

const RepositoryWorkspace = ({ repository }: RepositoryWorkspaceProps) => {
  return (
    <section className="mt-5 grid grid-cols-1 items-start gap-5 lg:grid-cols-5">
      {/* Main workspace: 60% */}
      <div className="min-w-0 lg:col-span-3">
        <RepositoryManagement repository={repository}/>
      </div>

      {/* Sidebar: 40% */}
      <aside className="min-w-0 lg:col-span-2">
        <RepositoryOverview repository={repository}/>
      </aside>
    </section>
  );
};

export default RepositoryWorkspace;