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
  IconButton,
} from "@mui/material";
import {
  AlertPoper,
  ConfirmPopover,
  Tooltip,
  HtmlTooltip,
} from "@components/ui";
import useArticleDraft from "@framework/management/blog/article/draft/use-article-draft";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
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
import { useTabs } from "@components/common/Tabs/TabsProvider";
import {
  ConfirmDialog,
  RefFormik,
  SubmitButton,
  useRefFormik,
} from "@components/ui";
import { blueGrey } from "@mui/material/colors";
import { ImagePanel, UploaderComponent } from "./Article";
import { ArticleFormParameters } from "./ArticleFormParameters";

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
      {value === index && <Box sx={{ p: { xs: 1, md: 2 } }}>{children}</Box>}
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
  const { value, handleChange, setTabNumber } = useTabs();
  const { data } = useArticleDraft();
  const displayingPageUrl: string = data?.absURL || data?.url || "";
  return (
    <>
      <Paper
        sx={{
          background: blueGrey[100],
          borderRadius: "12px",
        }}
        elevation={4}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="article editor tabs"
            sx={{
              "& .MuiTabs-flexContainer": {
                alignItems: "flex-end",
                justifyContent: "end",
                background: (theme) => theme.palette.background.paper,
                borderRadius: "12px 12px 0 0",
              },
            }}
          >
            <Tab label="Публикация" {...a11yProps(0)} />
            <Tab label="Изображение" {...a11yProps(1)} />
            <Tab label="Параметры" {...a11yProps(2)} />
            <Tab label="Текст" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <Box
          sx={{
            minHeight: "65vh",
            "& .mainImage": {
              marginLeft: { sm: "-5px", md: "-9px" },
              borderRadius: "8px",
              cursor: "pointer",
            },
          }}
        >
          <TabPanel value={value} index={0}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={4} lg={2} pr={0} mr={0}>
                <UploaderComponent />
              </Grid>
              <Grid item xs={12} sm={8} lg={10}>
                <Grid container spacing={0}>
                  <Grid item xs={12} md={12}>
                    <ArticleTitle />
                  </Grid>
                  {displayingPageUrl && (
                    <Grid item xs={12}>
                      <Paper
                        elevation={1}
                        sx={{ width: "100%", p: 1, fontWeight: 600 }}
                      >
                        <Stack direction={"row"}>
                          <Box sx={{ flexGrow: 1 }}>
                            Страница на сайте:{" "}
                            <Tooltip title={"Читать статью на сайте"} inline>
                              <a
                                href={displayingPageUrl}
                                title={displayingPageUrl}
                                rel="noreferrer"
                                target="_blank"
                              >
                                {displayingPageUrl}
                              </a>
                            </Tooltip>
                          </Box>
                          <Box>
                            <Tooltip
                              title={"Скопировать ссылку"}
                              placement="left"
                            >
                              <AlertPoper message="Ссылка скопирована">
                                <IconButton
                                  onClick={() => {
                                    if (displayingPageUrl) {
                                      navigator.clipboard.writeText(
                                        displayingPageUrl
                                      );
                                    }
                                  }}
                                >
                                  <ContentCopyRoundedIcon />
                                </IconButton>
                              </AlertPoper>
                            </Tooltip>
                          </Box>
                        </Stack>
                      </Paper>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ImagePanel />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ArticleFormParameters />
          </TabPanel>
          <Box sx={{ display: [0, 3].includes(value) ? "inherit" : "none" }}>
            <ArticleTextEditor />
          </Box>
        </Box>
      </Paper>
    </>
  );
};
