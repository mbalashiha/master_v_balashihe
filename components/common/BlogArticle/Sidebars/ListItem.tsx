import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  Button,
  Container,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";

import { Blog } from "@common/types/cms";
import React from "react";

type Props = React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
> &
  Blog.NavigationItem;

export default function ListItem({
  active,
  title,
  url,
  viewed,
  modifiedDate,
  ...rest
}: Props) {
  if (active) {
    return (
      <li className={cn({ active: Boolean(active) })}>
        <div>{title}</div>
      </li>
    );
  } else {
    return (
      <li
        itemProp="itemListElement"
        className={cn({ active: Boolean(active) })}
      >
        <Stack direction="column" width="100%">
          <Link itemProp="url" href={url}>
            {title}
          </Link>
          <meta itemProp="name" content={title} />
          <Grid container width="100%">
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
                "&::before": {
                  display: "inline-block",
                  fontFamily: "Material Icons Round",
                  fontStyle: "normal",
                  content: `"\\ebcc"`,
                  pr: "4px",
                  fontSize: "18px",
                  lineHeight: "19px",
                },
                "& > div": {
                  fontSize: "12px",
                  lineHeight: "19px",
                },
              }}
            >
              <Box>{modifiedDate}</Box>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
                "&::before": {
                  display: "inline-block",
                  fontFamily: "Material Icons Round",
                  fontStyle: "normal",
                  content: `"\\e8f4"`,
                  pr: "4px",
                  fontSize: "19px",
                  lineHeight: "19px",
                },
                "& > div": {
                  fontSize: "12px",
                  lineHeight: "19px",
                },
              }}
              title={`${viewed} просмотров`}
            >
              <Box>{viewed}</Box>
            </Grid>
          </Grid>
        </Stack>
      </li>
    );
  }
}
