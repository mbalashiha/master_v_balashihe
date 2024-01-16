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
  FormLabel,
} from "@mui/material";
import {
  AlertPoper,
  ConfirmPopover,
  Tooltip,
  HtmlTooltip,
} from "@components/ui";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { ArticleEventsProvider } from "./ArticleEventsProvider";
import {
  ArticleKeyTextEditor,
  ArticleBodyHtml,
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
import { getCanonicalUrl } from "@framework/utils/normalize";

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
      {value === index && <>{children}</>}
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
  const displayingPageUrl: string = useMemo(
    () =>
      article.absURL
        ? getCanonicalUrl(article.absURL)
        : article.canonicalUrl || article.url || "",
    [article.absURL, article.canonicalUrl, article.url]
  );
  return (
    <>
      <Paper
        sx={{
          borderRadius: "12px",
          p: 0,
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
        <Box>
          <TabPanel value={value} index={0}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={2}>
                <FirstTabImageUploader />
              </Grid>
              <Grid item xs={12} sm={10}>
                <Grid container spacing={1} p={0.8}>
                  <Grid item xs={12} md={12}>
                    <ArticleTitle />
                  </Grid>
                  {displayingPageUrl && (
                    <Grid item xs={12}>
                      <Paper
                        elevation={1}
                        sx={{
                          width: "100%",
                          p: 1,
                          pt: 0.3,
                          fontWeight: 600,
                          borderRadius: "6px",
                        }}
                      >
                        <Stack direction={"row"}>
                          <Box sx={{ flexGrow: 1 }}>
                            <FormLabel
                              sx={{
                                display: "block",
                                fontWeight: 500,
                                color: "grey.700",
                              }}
                            >
                              Страница на сайте:{" "}
                            </FormLabel>
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
            <ArticleBodyHtml />
          </Box>
        </Box>
      </Paper>
    </>
  );
};
