import parse, { attributesToProps, domToReact } from "html-react-parser";
import type {
  Element,
  DOMNode,
  HTMLReactParserOptions,
} from "html-react-parser";
import StyledGrid from "./StyledGrid";
import { Box, SxProps } from "@mui/material";
interface Props {
  tableNode: Element;
  options: HTMLReactParserOptions;
}
const getColumnsInfo = (tableNode: Element) => {
  const arr_ch = tableNode.children.filter(
    (child: any) => child.name === "tbody" && child.children
  );
  const tableBody: Element = arr_ch[0] ? (arr_ch[0] as any) : tableNode;
  // let gridColumnsNumber = 0;
  let gridColumnsPercentage = undefined;
  const trs: Element[] = tableBody.children.filter(
    (child: any) => child.name === "tr" && child.children
  ) as any;
  for (const tr of trs) {
    const tds: Element[] = tr.children.filter(
      (child: any) => child.name === "td"
    ) as any;
    if (!gridColumnsPercentage && tds.length) {
      const colspan = tds.find((tdElem: any) => {
        const td: Element = tdElem;
        if (
          td.attribs &&
          td.attribs["colspan"] &&
          parseInt(td.attribs["colspan"]) > 1
        ) {
          return true;
        } else {
          return false;
        }
      });
      if (!colspan) {
        // gridColumnsNumber = tds.length;
        gridColumnsPercentage = [];
        // let allIsPercents = true;
        for (const td of tds) {
          let styleWidth = "auto";
          if (td.attribs && td.attribs.style) {
            const { style } = attributesToProps({ style: td.attribs.style });
            if (style.width) {
              styleWidth = style.width;
            }
          }
          gridColumnsPercentage.push(styleWidth);
          // if (!styleWidth.endsWith("%")) {
          //   allIsPercents = false;
          // }
        }
        gridColumnsPercentage[gridColumnsPercentage.length - 1] = "auto";
        break;
      }
    }
  }
  return { gridColumnsPercentage: gridColumnsPercentage?.join(" ") || "auto" };
};
const getCells = (tableNode: Element) => {
  const arr_ch: Array<{ isHeader: boolean; node: Element }> = tableNode.children
    .filter(
      (child: any) =>
        child.children &&
        (child.name === "tbody" ||
          child.name === "thead" ||
          child.name === "tfoot")
    )
    .map((child: any) => ({
      isHeader: child.name === "thead" || child.name === "tfoot",
      node: child,
    }));
  if (!arr_ch.length) {
    arr_ch.push({ isHeader: false, node: tableNode });
  }
  /*const captions: Array<any> = [];
  arr_ch.forEach(
    (elem: any) =>
      elem &&
      elem.children &&
      elem.children
        .filter((child: any) => child.name === "caption")
        .forEach((inChild: any) => {
          captions.push(inChild);
        })
  );
  if (captions.length) {
    console.l//og(captions);
  }*/
  const allCells: typeof arr_ch = [];
  arr_ch.forEach((bodyElem) => {
    const trs: Element[] = bodyElem.node.children.filter(
      (child: any) => child.name === "tr" && child.children
    ) as any;
    for (const tr of trs) {
      const tds: typeof arr_ch = tr.children
        .filter((child: any) => child.name === "td" || child.name === "th")
        .map((child: any) => ({
          isHeader: bodyElem.isHeader || child.name === "th",
          node: child,
        }));
      allCells.push(...tds);
    }
  });
  return allCells;
};
interface SwitcherProps {
  children: React.ReactNode | React.ReactNode[];
  isHeader: boolean;
  paragraphsLength: number;
  shouldAddStrongTag: boolean;
}
const CellContainerSwither = ({
  children,
  isHeader,
  paragraphsLength,
  shouldAddStrongTag,
}: SwitcherProps) => {
  if (isHeader) {
    return <h4>{children}</h4>;
  } else if (shouldAddStrongTag) {
    return (
      <p>
        <strong>{children}</strong>
      </p>
    );
  } else if (paragraphsLength <= 0) {
    return <p>{children}</p>;
  } else {
    return <>{children}</>;
  }
};
function TableStructure({ tableNode, options }: Props) {
  const { gridColumnsPercentage } = getColumnsInfo(tableNode);
  const allCells = getCells(tableNode);
  return (
    <StyledGrid gridColumnsPercentage={gridColumnsPercentage}>
      {allCells.map((cell, ind) => {
        const attribs: any = attributesToProps(cell.node.attribs);
        const { colSpan, rowSpan, style, ...rest } = attribs;
        const paragraphs = cell.node.children.filter(
          (child: any) => child.name === "p"
        );
        const shouldAddStrongTag =
          colSpan &&
          paragraphs.length <= 0 &&
          cell.node.children.filter((child: any) => child.name === "strong")
            .length <= 0
            ? true
            : false;
        const flexCentered: SxProps =
          colSpan || rowSpan
            ? {
                display: "flex",
                flexDirection: rowSpan ? "column" : "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }
            : {};
        return (
          <Box
            {...rest}
            key={ind}
            component="div"
            sx={{
              background: colSpan
                ? (theme) => theme.palette.cellHeaderBackground.main
                : (theme) => theme.palette.secondaryBackground.main,
              gridColumn: colSpan && `span ${colSpan}`,
              gridRow: rowSpan && `span ${rowSpan}`,
              textAlign: colSpan && "center",
              ...flexCentered,
            }}
          >
            <CellContainerSwither
              isHeader={cell.isHeader}
              paragraphsLength={paragraphs.length}
              shouldAddStrongTag={shouldAddStrongTag}
            >
              {domToReact(cell.node.children, options)}
            </CellContainerSwither>
          </Box>
        );
      })}
    </StyledGrid>
  );
}
export default TableStructure;
