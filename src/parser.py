import pandas as pd

variables = {
    'height', #cm
    'weight', #kg
    'bmi',    #kg/m^2
}

def parse_ansur_ii():
    path_f = "data/ansur-ii/ANSUR_II_FEMALE_Public.csv"
    path_m = "data/ansur-ii/ANSUR_II_MALE_Public.csv"

    label_map = {
        'stature':  'height',
        'weightkg': 'weight',
    }

    data = pd.DataFrame()
    for path in [path_f, path_m]:
        df = pd.read_csv(path, encoding="cp1252")
        df = df.filter(items=label_map.keys())
        df = df.set_axis(df.columns.map(label_map), axis=1)

        if data.empty:
            data = df
        else:
            data = pd.concat([data, df])
            pass

    data *= 0.1
    data['bmi'] = 10000 * data['weight'] / (data['height'] * data['height'])
    data.round(decimals=1).reset_index().to_json("data/ansur-ii/ansur-ii.json", orient='columns')

def main():
    parse_ansur_ii()

if __name__ == "__main__":
    main()
