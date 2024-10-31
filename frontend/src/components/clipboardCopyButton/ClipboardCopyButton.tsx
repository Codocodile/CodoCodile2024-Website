import React from "react";
import {Typography, Button} from "@material-tailwind/react";
import {useCopyToClipboard} from "usehooks-ts";
import {CheckIcon, DocumentDuplicateIcon} from "@heroicons/react/24/outline";

export function ClipboardCopyButton({text, title}: { text: string, title: string }) {
    const [, copy] = useCopyToClipboard();
    const [copied, setCopied] = React.useState(false);

    return (
        <div className={"flex flex-col"}>
            <Typography className={"flex text-light-blue-50"}>
            {title}
            </Typography>
            <Button
                variant={"gradient"}
                onMouseLeave={() => setTimeout(() => setCopied(false), 2000)}
                className="flex flex-row-reverse items-center justify-end gap-x-3 px-4 py-2.5 lowercase"
                onClick={() => {
                    copy(text);
                    setCopied(true);
                }}
            >
                <Typography
                    className="border-l border-gray-400/50 pl-3 font-normal"
                    variant="small"
                >
                    {text}
                </Typography>

                {copied ? (
                    <CheckIcon className="h-4 w-4 text-white"/>
                ) : (
                    <DocumentDuplicateIcon className="h-4 w-4 text-white"/>
                )}
            </Button>
        </div>

    );
}