# 3D Models Directory

This directory contains 3D furniture models in GLB format for the AR Furniture App.

## Model Files

The following models are used in the furniture library:

### Chairs
- `chair_modern.glb` - Modern office chair
- `chair_dining.glb` - Dining room chair
- `chair_lounge.glb` - Comfortable lounge chair

### Tables
- `table_dining.glb` - Large dining table
- `coffee_table.glb` - Living room coffee table
- `side_table.glb` - Small side table

### Sofas
- `sofa_sectional.glb` - L-shaped sectional sofa
- `sofa_loveseat.glb` - Two-seat loveseat
- `sofa_recliner.glb` - Reclining chair

### Desks
- `desk_office.glb` - Professional office desk
- `desk_standing.glb` - Adjustable standing desk
- `desk_writing.glb` - Classic writing desk

### Beds
- `bed_queen.glb` - Queen size bed with headboard
- `bed_king.glb` - King size platform bed
- `bed_bunk.glb` - Space-saving bunk bed

### Cabinets
- `cabinet_storage.glb` - Tall storage cabinet
- `cabinet_kitchen.glb` - Kitchen cabinet unit
- `wardrobe.glb` - Bedroom wardrobe

### Decorations
- `lamp_floor.glb` - Modern floor lamp
- `plant_large.glb` - Large decorative plant
- `artwork_frame.glb` - Framed wall art

## Model Requirements

- **Format**: GLB (binary GLTF)
- **Size**: Keep under 2MB per model for performance
- **Textures**: Embedded in GLB file
- **Optimization**: Use Draco compression when possible
- **Scaling**: Models should be to real-world scale (meters)

## Adding New Models

1. Export your 3D model in GLB format
2. Place the file in this directory
3. Add an entry to `src/utils/FurnitureLibrary.ts`
4. Create a thumbnail image in `assets/thumbnails/`
5. Test the model in the app

## Model Sources

These are placeholder entries. In a production app, you would:
- License models from 3D marketplaces
- Create custom models with 3D software
- Use procedurally generated furniture
- Partner with furniture manufacturers

## Performance Notes

- Models with high polygon counts may impact performance
- Use LOD (Level of Detail) models for complex furniture
- Consider texture resolution vs. file size trade-offs
- Test on target devices for smooth AR experience
