import React, { useRef, useEffect, useMemo } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useArticleDraft from "@framework/management/blog/article/draft/use-article-draft";
import { ArticleProvider } from "./ArticleProvider";
import { ArticleTextEditor } from "@components/management/blog";
import { Title } from "@mui/icons-material";
import ArticleTitle from "./ArticleTitle";
import useSaveArticle from "@framework/management/blog/article/use-save-article";
import { ValuesOfCorrectTypeRule } from "graphql";
import { slugify } from "@lib";
import { useRouter } from "next/router";
import { useFabButton } from "../Layout";
import DeleteDraftButton from "./Article/DeleteDraftButton";
import { useSnackbar } from "notistack";
import SaveIcon from "@mui/icons-material/Save";
import {
  ConfirmDialog,
  RefFormik,
  SubmitButton,
  useRefFormik,
} from "@components/ui";
import { blueGrey } from "@mui/material/colors";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`article-editor-tabpanel-${index}`}
      aria-labelledby={`article-editor-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `article-props-tab-${index}`,
    "aria-controls": `article-props-tabpanel-${index}`,
  };
}

export const ArticleTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { data } = useArticleDraft();
  return (
    <>
      <Paper sx={{ minHeight: "70vh" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="article editor tabs"
            sx={{
              "& .MuiTabs-flexContainer": {
                alignItems: "flex-end",
                justifyContent: "end",
              },
            }}
          >
            <Tab label="Публикация" {...a11yProps(0)} />
            <Tab label="Параметры" {...a11yProps(1)} />
            <Tab label="Редактор" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <Box sx={{ background: blueGrey[100] }}>
          <TabPanel value={value} index={0}>
            <Grid container spacing={0}>
              <Grid item xs={12} md={12}>
                <ArticleTitle />
              </Grid>
              {data?.url && (
                <Grid item xs={12}>
                  <Paper
                    elevation={2}
                    sx={{ width: "100%", p: 1, fontWeight: 600 }}
                  >
                    Страница на сайте:{" "}
                    <a
                      href={data.url}
                      title={data.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {data.url}
                    </a>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            
          </TabPanel>
          <Box sx={{ display: [0, 2].includes(value) ? "inherit" : "none" }}>
            <ArticleTextEditor />
          </Box>
        </Box>
      </Paper>
    </>
  );
};
