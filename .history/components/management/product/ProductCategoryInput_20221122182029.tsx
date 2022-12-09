import React, { useState, createContext, useContext } from "react";
import useSWR from "swr";
import {
  TextField,
  Container,
  Card,
  Fab,
  Grid,
  Paper,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  AppBar,
  Toolbar,
  Box,
  Autocomplete,
  IconButton,
} from "@components/ui";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import styles from "@/ui/forms/TextInput.module.scss";
import fetcher from "@/src/db/fetcher";
import { useUI, dialogTypes } from "@components/ui";
import { VscTrash } from "react-icons/vsc";
import { ConfirmPopover } from "@components/ui";
import useRemoveCategory from "@framework/commerce/management/product/use-remove-category";
import { useManagementProvider } from "@framework/commerce/management";
import Schema from "@framework/types/schema";
import { useField } from "formik";
import useSaveDraft from "@framework/commerce/management/product/use-save-draft";
import { useProductProvider } from "@components/management/product/ProductEditForm/ProductProvider";
import { ProductEditorInput } from "@common/commerce/types";
import { useFormProvider } from "@components/form";

const ProductCategoryInput = (props) => {
  const { setFieldValue, formik } = useFormProvider<ProductEditorInput>();
  const saveDraft = useSaveDraft();
  const removeCategory = useRemoveCategory();
  const { productCategories: categoriesOptions } = useProductProvider();
  const [categoryField, categoryFieldMeta] = useField("category");
  const setCategory = (option: Schema.ProductCategory | null) => {
    setFieldValue("category", {
      id: (option && option.id) || null,
      handle: (option && option.handle) || "",
    });
  };
  const { openDialog } = useUI();
  const openNewCategory = () => openDialog(dialogTypes.NEW_PRODUCT_CATEGORY);
  const selectedCategoryId =
    (categoryField.value && categoryField.value.id) || null;
  return (
    <>
        <Box sx={{ display: "flex" }}>
          <Autocomplete
            sx={{ flexGrow: 1, marginRight: "4px" }}
            options={Array.isArray(categoriesOptions) ? categoriesOptions : []}
            value={
              (Array.isArray(categoriesOptions) &&
                categoriesOptions.find((category) => {
                  const idFlag =
                    selectedCategoryId && category.id == selectedCategoryId;
                  if (idFlag) {
                    if (
                      ((categoryField.value && categoryField.value.handle) ||
                        null) !== (category.handle || null)
                    ) {
                      setCategory(category);
                    }
                  }
                  return idFlag;
                })) ||
              null
            }
            getOptionLabel={(option: any) =>
              (option && option.name) || `Категория не задана`
            }
            renderOption={(props: any, option: any, state: any) => {
              return (
                <Box
                  component="li"
                  {...props}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 36,
                    p: 0,
                  }}
                >
                  <Box
                    component="div"
                    sx={{
                      p: 0,
                      m: 0,
                      lineHeight: 0,
                      mr: "auto",
                      display: "block",
                    }}
                  >
                    {(Array.isArray(option.breadcrumbs) &&
                      option.breadcrumbs.length && (
                        <>
                          {option.breadcrumbs
                            .map(
                              (br) => br.name || br.handle || JSON.stringify(br)
                            )
                            .map((el: string) =>
                              el.length > 12 ? el.substring(0, 12) + "..." : el
                            )
                            .join(" / ")}
                        </>
                      )) || <>{option.name}</>}
                  </Box>
                  <Box
                    component="div"
                    sx={{
                      minHeight: 36,
                      minWidth: 40,
                      marginRight: 0,
                    }}
                  >
                    <div style={{ float: "right" }}>
                      {option.productsCount || (
                        <ConfirmPopover
                          message={"Удалить категорию?"}
                          onConfirm={(event) =>
                            removeCategory({ categoryId: option.id })
                          }
                          trigger={
                            <IconButton sx={{ p: 0.6, m: 0 }}>
                              <DeleteForeverSharpIcon sx={{ fontSize: 34 }} />
                            </IconButton>
                          }
                        />
                      )}
                    </div>
                  </Box>
                </Box>
              );
            }}
            onChange={(event, newValue: any) => {
              setCategory(newValue || null);
              saveDraft();
            }}
            id="product-category-input"
            noOptionsText={"Ничего нет"}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={"Категория товара"}
                label={"Категория товара"}
                required
                fullWidth
                error={false}
                helperText={""}
              />
            )}
          />
          <Box sx={{ padding: 0 }}>
            <Fab onClick={openNewCategory} aria-label="add">
              <AddIcon />
            </Fab>
          </Box>
        </Box>
        {props.errorMessage && (
          <div
            style={{ display: props.errorMessage ? "block" : "none" }}
            className="simplecheckout-error-text simplecheckout-rule"
          >
            {props.errorMessage || "Вы должны заполнить это поле."}
          </div>
        )}
    </>
  );
};
export default ProductCategoryInput;
