const loadOldTable = () => {
    return(`
        <table border='1'>
    <tr>
        <th rowspan="4">**CLASS**</th>
        <th rowspan="4">**TOX**</th>
        <th rowspan="4"></th>
        <th colspan="4">t14323-2001</th>
        <th colspan="8">t14323-2002</th>
    </tr>
    <tr>
        <th rowspan="2" colspan="2">EFG SC (N=55)</th>
        <th rowspan="2" colspan="2">EFG IV (N=55)</th>
        <th colspan="6">Study Treatement Assignment</th>
        <th rowspan="2" colspan="2">TOTAL (N=164)</th>
    </tr>
    <tr>
        <th colspan="2">EFG SC (2001) - EFG SC (N=51)</th>
        <th colspan="2">EFG IV (2001) - EFG SC (N=48)</th>
        <th colspan="2">EFG IV (1705) - EFG SC (N=65)</th>
    </tr>
    <tr>
        <th>n/M²</th>
        <th>%</th>
        <th>n/M²</th>
        <th>%</th>
        <th>n/M²</th>
        <th>%</th>
        <th>n/M²</th>
        <th>%</th>
        <th>n/M²</th>
        <th>%</th>
        <th>n/M²</th>
        <th>%</th>
    </tr>
    <tr>
        <td rowspan="8">Chemistry</td>
        <td rowspan="2">CHOLESTEROL HIGH</td>
        <td> Cholesterol high</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td> Grade 3</td>
        <td> 0</td>
        <td></td>
        <td> 0</td>
        <td></td>
        <td> 0</td>
        <td></td>
        <td> 0</td>
        <td></td>
        <td> 1 / 60</td>
        <td>1,7</td>
        <td> 1 / 158</td>
        <td>0,6</td>
    </tr>
    <tr>
        <td rowspan="2">GGT INCREASED</td>
        <td> Ggt increased</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td> Grade 3</td>
        <td> 1 / 78</td>
        <td>2,345</td>
        <td> 1 / 78</td>
        <td>2,345</td>
        <td> 1 / 51</td>
        <td>2,0</td>
        <td> 0</td>
        <td></td>
        <td> 0</td>
        <td></td>
        <td> 1 / 523</td>
        <td>0,6</td>
    </tr>
    <tr>
        <td rowspan="2">Grade 4</td>
        <td> Grade 4</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td> Grade 3</td>
        <td> 0</td>
        <td></td>
        <td> 0</td>
        <td></td>
        <td> 0</td>
        <td></td>
        <td> 1 / 47</td>
        <td>2,1</td>
        <td> 0</td>
        <td></td>
        <td> 1 / 523</td>
        <td>0,6</td>
    </tr>
    <tr>
        <td rowspan="2">HYPERTRIGLYCERIDEMIA</td>
        <td> Hypertriglyceridemia</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td> Grade 3</td>
        <td> 1 / 78</td>
        <td>2,345</td>
        <td> 1 / 78</td>
        <td>2,345</td>
        <td> 1 / 51</td>
        <td>2,0</td>
        <td> 0</td>
        <td></td>
        <td> 0</td>
        <td></td>
        <td> 1 / 158</td>
        <td>0,6</td>
    </tr>
    <tr>
        <td rowspan="9">Hematology</td>
        <td rowspan="2">ACTIVATED PARTIAL THROMBOPLASTIN TIME PROLONGED</td>
        <td> Activated partial thromboplastin time prolonged</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td> Grade 3</td>
        <td> 0</td>
        <td></td>
        <td> 1 / 78</td>
        <td>2,345</td>
        <td> 0</td>
        <td></td>
        <td> 1 / 47</td>
        <td>2,1</td>
        <td> 0</td>
        <td></td>
        <td> 1 / 523</td>
        <td>0,6</td>
    </tr>
    <tr>
        <td rowspan="3">LYMPHOCYTE COUNT DECREASED</td>
        <td> Lymphocyte count decreased</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td> Grade 3</td>
        <td> 3 / 78</td>
        <td>5,5</td>
        <td> 2 / 78</td>
        <td>3,6</td>
        <td> 5 / 51</td>
        <td>9,8</td>
        <td> 2 / 47</td>
        <td>4,3</td>
        <td> 5 / 65</td>
        <td>8,1</td>
        <td> 12 / 523</td>
        <td>7,5</td>
    </tr>
    <tr>
        <td> Grade 4</td>
        <td> 0</td>
        <td></td>
        <td> 0</td>
        <td></td>
        <td> 0</td>
        <td></td>
        <td> 0</td>
        <td></td>
        <td> 1 / 65</td>
        <td>3,345</td>
        <td> 1 / 523</td>
        <td>0,6</td>
    </tr>
    <tr>
        <td rowspan="2">Some count decreased</td>
        <td> Some count decreased</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td> Grade 3</td>
        <td> 0</td>
        <td></td>
        <td> 1 / 78</td>
        <td>2,345</td>
        <td> 0</td>
        <td></td>
        <td> 0</td>
        <td></td>
        <td> 1 / 65</td>
        <td>3,345</td>
        <td> 1 / 523</td>
        <td>0,6</td>
    </tr>
    <tr>
        <td rowspan="2">WHITE BLOOD CELL DECREASED</td>
        <td> White blood cell decreased</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td> Grade 3</td>
        <td> 0</td>
        <td></td>
        <td> 1 / 78</td>
        <td>2,345</td>
        <td> 0</td>
        <td></td>
        <td> 0</td>
        <td></td>
        <td> 0</td>
        <td></td>
        <td> 0</td>
        <td></td>
    </tr>
</table>`

    )
}

export default loadOldTable