import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { useArticleEvents } from "../../ArticleEventsProvider";
import { useTabs } from "@components/common/Tabs/TabsProvider";

export default function ToggleTinyMceFullscreen() {
  const { editorRef } = useArticleEvents();
  const { value: tabNumber, setTabNumber } = useTabs();
  return (
    <Button
      title="Редактор текста статьи во весь экран"
      sx={{
        fontSize: "12px",
        lineHeight: "15px",
        py: "3px",
      }}
      startIcon={<FullscreenIcon />}
      onClick={() => {
        if (![0, 1].includes(tabNumber)) {
          setTabNumber(1);
        }
        editorRef.current?.toggleEditorFullscreen();
      }}
    >
      <Box component="span" sx={{ textAlign: "left" }}>
        Полный экран <br />c текстом
      </Box>
    </Button>
  );
}
