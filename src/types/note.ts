// types/nodes.ts

/**
 * Base fields shared by both folders and files.
 */
export interface BaseNode {
  /** Unique identifier for this node (folder or file). */
  _id?: string;

  quibble_id: string;

  /** ID of the user (tenant) who owns this node. */
  tenantId: string;

  /** Name of the folder or file (e.g. "app", "route.ts"). */
  name: string;

  /** Timestamp when this node was first created. */
  createdAt: Date;

  /** Timestamp when this node was last updated. */
  updatedAt: Date;

  /** Last time this note was accessed by the user */
  lastAccessed?: Date;

  /** Last time this note was edited (differs from updatedAt which includes metadata changes) */
  lastEdited?: Date;
}

/**
 * A folder node (no `content` field).
 */
export interface FolderNode extends BaseNode {
  type: "folder";
  // No `content` property here
}

/**
 * A file node (holds JSON content).
 */
export interface FileNode extends BaseNode {
  /**
   * JSON object representing the file's contents.
   * For TipTap notes, this will contain the editor's JSON structure.
   */
  content: {
    /**
     * Raw TipTap JSON content
     */
    tiptap?: Record<string, any>;

    /**
     * Plain text representation of the content
     */
    text?: string;
  };
}

/**
 * Discriminated union: either a folder or a file.
 */
export type Node = FolderNode | FileNode;

// Graph Stuff
export type GraphBaseNode = {
  id: string;
  createdAt: string;
  tags: string[];
} & (Thought | Bookmark | MediaPost);

export type Thought = {
  type: "thought";
  text: string;
};

export type Bookmark = {
  type: "bookmark";
  url: string;
  title: string;
  description?: string;
};

export type MediaPost = {
  type: "media";
  platform: "twitter" | "instagram";
  url: string;
  caption: string;
};

export type Edge = {
  id: string;
  from: string;
  to: string;
  kind: "SIMILAR_TO" | "TAGGED_AS" | "LINKS_TO" | "MENTIONS";
};
