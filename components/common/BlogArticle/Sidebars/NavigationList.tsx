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
import NavStackContainer from "./NavStackContainer";

interface Props {
  articlesList: Blog.NavigationItem[];
}

export default function NavigationList({ articlesList }: Props) {
  return (
    <NavStackContainer>
      {articlesList.map((el) => (
        <li
          itemProp="name"
          className={cn({ active: Boolean(el.active) })}
          key={el.title + "_" + (el.url || "")}
        >
          {el.active ? (
            <div>{el.title}</div>
          ) : (
            <Link itemProp="url" href={el.url}>
              {el.title}
            </Link>
          )}
        </li>
      ))}
    </NavStackContainer>
  );
}
