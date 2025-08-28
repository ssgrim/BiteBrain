# Data Models (DynamoDB logical)

- **User**(pk: user#{id})
  - id, email, home_region, default_species
- **TackleItem**(pk: user#{id}, sk: tackle#{id})
  - type, brand, model, size, weight, color, category, available_today
- **Waterbody**(pk: waterbody#{id})
  - name, region, bounds, has_tide
- **Spot**(pk: waterbody#{id}, sk: spot#{id})
  - geom, label, structure[]
- **ConditionSnapshot**(pk: waterbody#{id}, sk: cond#{ts})
  - air_temp, wind, cloud, pressure_trend, water_temp?, clarity?
- **SpeciesProfile**(pk: species#{name}:region#{id})
  - spawn_temp_min/max, seasonal_notes[], color_rules[]
- **Recommendation**(pk: user#{id}, sk: rec#{ts})
  - species, patterns[], lures[], waypoints[]
- **CatchLog**(pk: user#{id}, sk: catch#{ts})
  - species, length?, weight?, lure_id, depth, cover, waypoint_id?, photo_url
