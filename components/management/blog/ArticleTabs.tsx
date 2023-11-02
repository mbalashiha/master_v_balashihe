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
import {
  ArticleKeyTextEditor,
  ArticleTextHtml,
} from "@components/management/blog";
import { Title } from "@mui/icons-material";
import ArticleTitle from "./ArticleTitle";
import SaveIcon from "@mui/icons-material/Save";
import { useTabs } from "@components/common/Tabs/TabsProvider";
import { blueGrey } from "@mui/material/colors";
import { ArticleFormParameters } from "./ArticleFormParameters";
import ArticleTemplates from "./Article/ArticleTemplates";
import { Blog } from "@common/types/cms";
import FirstTabImageUploader from "./Article/FirstTabImageUploader";
import ImagesTabPanel from "./Article/ImagesTabPanel";

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

interface Props {
  article: Blog.ArticleDraft;
}
export const ArticleTabs = ({ article }: Props) => {
  const { value, handleChange, setTabNumber } = useTabs();
  const displayingPageUrl: string = article.absURL || article.url || "";
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
              "& .Tabs-flexContainer": {
                alignItems: "flex-end",
                justifyContent: "end",
                background: (theme) => theme.palette.background.paper,
                borderRadius: "12px 12px 0 0",
              },
            }}
          >
            <Tab label="Публикация" {...a11yProps(0)} />
            <Tab label="Текст" {...a11yProps(1)} />
            <Tab label="Описание" {...a11yProps(2)} />
            <Tab label="Изображение" {...a11yProps(3)} />
            <Tab label="Параметры" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <Box
          sx={{
            minHeight: "95vh",
          }}
        >
          <TabPanel value={value} index={0}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={4} lg={2} pr={0} mr={0}>
                <FirstTabImageUploader />
              </Grid>
              <Grid item xs={12} sm={8} lg={10}>
                <Grid container spacing={1}>
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
                  <Grid item xs={12} md={12}>
                    <ArticleTemplates />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ArticleKeyTextEditor />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ImagesTabPanel />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <ArticleFormParameters />
          </TabPanel>
          <Box sx={{ display: [0, 1].includes(value) ? "inherit" : "none" }}>
            <ArticleTextHtml />
          </Box>
        </Box>
      </Paper>
    </>
  );
};
