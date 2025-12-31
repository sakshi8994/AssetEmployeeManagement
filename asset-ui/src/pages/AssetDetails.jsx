import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAssetById } from "../../apis/assetApi";
import { Box, Typography } from "@mui/material";

export default function AssetDetails() {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    getAssetById(id).then(res => setAsset(res.data));
  }, [id]);

  if (!asset) return null;

  return (
    <Box p={3}>
      <Typography variant="h5">{asset.assetTag}</Typography>
      <Typography>Brand: {asset.brand}</Typography>
      <Typography>Model: {asset.model}</Typography>
      <Typography>Status: {asset.status}</Typography>
    </Box>
  );
}
