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

export default function ListItem({ active, title, url, ...rest }: Props) {
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
        <Link itemProp="url" href={url}>
          {title}
        </Link>
        <meta itemProp="name" content={title} />
      </li>
    );
  }
}
