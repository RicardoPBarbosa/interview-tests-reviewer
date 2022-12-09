import { useState } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";

type Props = {
  notes: string;
  setNotes: (notes: string) => void;
  isReviewDetails: boolean;
};

export default function Notes({ notes, setNotes, isReviewDetails }: Props) {
  const [activeView, setActiveView] = useState<"editor" | "preview">(
    isReviewDetails ? "preview" : "editor"
  );

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex w-full justify-between items-end">
        <h3 className="font-semibold" style={{ fontStretch: "expanded" }}>
          Notes
        </h3>
        <nav
          className="print:hidden stats-tabs"
          aria-label="Tabs"
          role="tablist"
        >
          <button
            type="button"
            className={`tab${activeView === "editor" ? " active" : ""}`}
            role="tab"
            onClick={() => setActiveView("editor")}
          >
            Write
          </button>
          <button
            type="button"
            className={`tab${activeView === "preview" ? " active" : ""}`}
            role="tab"
            onClick={() => setActiveView("preview")}
          >
            Preview
          </button>
          <span
            className={`tab-item-animate${
              activeView === "preview" ? " active" : ""
            }`}
          ></span>
        </nav>
      </div>
      <div data-color-mode="light" className="w-full">
        {activeView === "editor" ? (
          <MDEditor
            value={notes}
            onChange={(value) => value !== undefined && setNotes(value)}
            preview="edit"
            commands={[
              commands.bold,
              commands.italic,
              commands.link,
              commands.quote,
              commands.group(
                [
                  commands.title1,
                  commands.title2,
                  commands.title3,
                  commands.title4,
                  commands.title5,
                  commands.title6,
                ],
                {
                  name: "title",
                  groupName: "title",
                  buttonProps: { "aria-label": "Insert title" },
                }
              ),
              commands.divider,
              commands.unorderedListCommand,
              commands.orderedListCommand,
              commands.checkedListCommand,
              commands.hr,
              commands.divider,
              commands.code,
              commands.codeBlock,
            ]}
            extraCommands={[commands.divider, commands.fullscreen]}
          />
        ) : (
          <div className="py-2 px-3 rounded-md bg-white min-h-[200px] border border-slate-300">
            <MDEditor.Markdown
              source={notes}
              style={{ whiteSpace: "pre-wrap" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
