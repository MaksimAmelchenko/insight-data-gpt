export type TUrl = string;
export type TDate = string;
export type TDateTime = string;
export type TTime = string;
export type THtml = string;
export type TText = string;
export type TUUid = string;

export interface ISelectable {
  isSelected: boolean;
  toggleSelection: () => void;
}

export interface IDeletable {
  isDeleting: boolean;
}
