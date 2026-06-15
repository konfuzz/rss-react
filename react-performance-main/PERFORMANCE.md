# Performance Optimization Report

## Baseline Measurements

### Interaction A: Sort countries

- **Commit duration**: 2.3 s
- **Render duration**: 187 ms
- **Screenshot**: ![screenshot](screenshots/baseline/sort.png)

### Interaction B: Search countries

- **Commit duration**: 2.9 s
- **Render duration**: 63 ms
- **Screenshot**: ![screenshot](screenshots/baseline/search.png)

### Interaction C: Change year

- **Commit duration**: 3.3 s
- **Render duration**: 171 ms
- **Screenshot**: ![screenshot](screenshots/baseline/year.png)

### Interaction D: Toggle column

- **Commit duration**: 1.6 s
- **Render duration**: 188 ms
- **Screenshot**: ![screenshot](screenshots/baseline/column.png)

---

## Optimized Measurements

### Interaction A: Sort countries

- **Commit duration**: 0.9 s
- **Render duration**: 6 ms
- **Screenshot**: ![screenshot](screenshots/optimized/sort.png)

### Interaction B: Search countries

- **Commit duration**: 1.4 s
- **Render duration**: 8 ms
- **Screenshot**: ![screenshot](screenshots/optimized/search.png)

### Interaction C: Change year

- **Commit duration**: 1.6 s
- **Render duration**: 14 ms
- **Screenshot**: ![screenshot](screenshots/optimized/year.png)

### Interaction D: Toggle column

- **Commit duration**: 0.7 s
- **Render duration**: 3 ms
- **Screenshot**: ![screenshot](screenshots/optimized/column.png)

## Summary of Improvements

| Interaction      | Baseline (ms) | Optimized (ms) | Improvement |
| ---------------- | ------------- | -------------- | ----------- |
| Sort countries   | 187           | 6              | 96.79%      |
| Search countries | 63            | 8              | 87.30%      |
| Change year      | 171           | 14             | 91.81%      |
| Toggle column    | 188           | 3              | 98.40%      |
| **Average**      | **152**       | **8**          | **93.58%**  |