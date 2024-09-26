import React, { useEffect } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface Props {
  pager: (page: number) => void;
  totalPages: number;
}

const TeamPagination = ({ pager, totalPages }: Props) => {
  const [active, setActive] = React.useState(1);
  const [activePages, setActivePages] = React.useState<number[]>([]);

  useEffect(() => {
    const newPages: number[] = [];
    for (let i = 1; i <= totalPages && i <= 5; i++) {
        newPages.push(i);
    }
    setActivePages(newPages);
  }, [totalPages]);

  const changePage = (page: number) => {
    pager(page);
    const newPages: number[] = [];
    for (let i = Math.max(1, page - 2); i <= totalPages && i <= Math.max(1, page - 2) + 4; i++) {
        newPages.push(i);
    }
    setActivePages(newPages);
    setActive(page);
  };

  const getItemProps = (index: number) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "white",
      onClick: () => changePage(index),
    } as any);

  const next = () => {
    if (active === totalPages) return;
    changePage(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    changePage(active - 1);
  };

  return (
    <div className="flex items-center gap-4 justify-between mt-2">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 text-white" />
      </Button>
      <div className="flex items-center gap-2">
        {activePages.map((page) => (
          <IconButton key={page} {...getItemProps(page)}>{page}</IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === totalPages}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4 text-white" />
      </Button>
    </div>
  );
}

export default TeamPagination;