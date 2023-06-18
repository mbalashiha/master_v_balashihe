import parse, { attributesToProps, domToReact } from "html-react-parser";
import type {
  Element,
  DOMNode,
  HTMLReactParserOptions,
} from "html-react-parser";
import StyledGrid from "./StyledGrid";
import { Box } from "@mui/material";
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
        let allIsPercents = true;
        for (const td of tds) {
          let styleWidth = "auto";
          if (td.attribs && td.attribs.style) {
            const { style } = attributesToProps({ style: td.attribs.style });
            if (style.width) {
              styleWidth = style.width;
            }
          }
          gridColumnsPercentage.push(styleWidth);
          if (!styleWidth.endsWith("%")) {
            allIsPercents = false;
          }
        }
        if (allIsPercents) {
          gridColumnsPercentage[gridColumnsPercentage.length - 1] = "auto";
        }
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
  colSpan: any;
  paragraphsLength: number;
}
const CellContainerSwither = ({
  children,
  isHeader,
  colSpan,
  paragraphsLength,
}: SwitcherProps) => {
  if (isHeader) {
    return <h4>{children}</h4>;
  } else if (paragraphsLength <= 0 && colSpan) {
    return (
      <p>
        <strong>{children}</strong>
      </p>
    );
  } else if (paragraphsLength <= 0) {
    return <p>{children}</p>;
  } else if (colSpan) {
    return <strong>{children}</strong>;
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
        return (
          <Box
            {...rest}
            key={ind}
            component="div"
            sx={{
              background: colSpan ? "#EFDDD1" : "#D9E3EF",
              gridColumn: colSpan && `span ${colSpan}`,
              gridRow: rowSpan && `span ${rowSpan}`,
              textAlign: colSpan && "center",
            }}
          >
            <CellContainerSwither
              isHeader={cell.isHeader}
              paragraphsLength={paragraphs.length}
              colSpan={colSpan}
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
