// ==========================================================
// Field schemas for each deliverable type in the Project Brief
// wizard (Step 2). One config drives the form for every
// video / reel / thumbnail / script / website entry, instead
// of duplicating near-identical form markup five times.
//
// field.type options: "text" | "textarea" | "url" | "select"
// ==========================================================

export const FIELD_SCHEMAS = {
  video: [
    { name: "title", label: "Video / Project Title", type: "text", required: true },
    { name: "footageLink", label: "Raw Footage Google Drive Link", type: "url", required: true },
    { name: "referenceLink", label: "Reference Video Link (optional)", type: "url" },
    { name: "deadline", label: "Deadline", type: "text", placeholder: "e.g. 12 Sept 2026" },
    {
      name: "instructions",
      label: "Extra Instructions",
      type: "textarea",
      placeholder: "Duration, editing style, music/SFX, captions needed, etc.",
    },
  ],

  reel: [
    { name: "title", label: "Reel Title / Topic", type: "text", required: true },
    { name: "footageLink", label: "Raw Footage Drive Link", type: "url", required: true },
    { name: "referenceLink", label: "Reference Reel Link (optional)", type: "url" },
    { name: "deadline", label: "Deadline", type: "text" },
    {
      name: "instructions",
      label: "Extra Instructions",
      type: "textarea",
      placeholder: "Duration, editing style, music/SFX, captions needed, etc.",
    },
  ],

  thumbnail: [
    { name: "videoTitle", label: "Video Title / Topic", type: "text", required: true },
    { name: "thumbnailText", label: "Thumbnail Text", type: "text" },
    { name: "style", label: "Design Style", type: "text", placeholder: "e.g. bold, minimal, MrBeast-style" },
    { name: "referenceThumbnail", label: "Reference Thumbnail (link)", type: "url" },
    { name: "assetsLink", label: "Required Images / Assets Drive Link", type: "url" },
    { name: "colorPreference", label: "Colour / Style Preference", type: "text" },
    { name: "deadline", label: "Deadline", type: "text" },
    { name: "instructions", label: "Extra Instructions", type: "textarea" },
  ],

  graphic: [
    {
      name: "designType",
      label: "Design Type",
      type: "select",
      options: ["Thumbnail", "Poster", "Logo", "Social Media Post", "Banner", "Other"],
      required: true,
    },
    { name: "topic", label: "Topic / Title", type: "text", required: true },
    { name: "designText", label: "Text on the Design (optional)", type: "text" },
    { name: "referenceLink", label: "Reference Image / Link (optional)", type: "url" },
    { name: "assetsLink", label: "Images / Assets Google Drive Link (optional)", type: "url" },
    { name: "deadline", label: "Deadline", type: "text" },
    {
      name: "instructions",
      label: "Extra Instructions",
      type: "textarea",
      placeholder: "Style, colours, mood, anything else we should know.",
    },
  ],

  script: [
    { name: "topic", label: "Topic", type: "text", required: true },
    { name: "platform", label: "Platform", type: "text", placeholder: "YouTube, Instagram, TikTok..." },
    { name: "duration", label: "Approximate Duration", type: "text" },
    { name: "language", label: "Language", type: "text" },
    { name: "tone", label: "Tone / Style", type: "text" },
    { name: "audience", label: "Target Audience", type: "text" },
    { name: "reference", label: "Reference / Example (link)", type: "url" },
    { name: "mainPoints", label: "Main Points to Cover", type: "textarea" },
    { name: "deadline", label: "Deadline", type: "text" },
    { name: "instructions", label: "Extra Instructions", type: "textarea" },
  ],

  website: [
    { name: "websiteType", label: "Website Type", type: "text", placeholder: "Portfolio, business, e-commerce..." },
    { name: "pages", label: "Number of Pages", type: "text" },
    { name: "referenceWebsites", label: "Reference Websites (links)", type: "textarea" },
    { name: "brandAssetsLink", label: "Logo / Brand Assets Drive Link", type: "url" },
    { name: "requiredFeatures", label: "Required Features", type: "textarea" },
    { name: "contentReady", label: "Is Content Ready?", type: "select", options: ["Yes", "No"], required: true },
    { name: "deadline", label: "Deadline", type: "text" },
    { name: "instructions", label: "Extra Requirements", type: "textarea" },
  ],
}

export function emptyEntryFor(type) {
  const schema = FIELD_SCHEMAS[type] || []
  const entry = {}
  schema.forEach((f) => (entry[f.name] = ""))
  return entry
}
