#include <bits/stdc++.h>
using namespace std;

#define ll long long
#define all(x) (x).begin(), (x).end()
#define pb push_back

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int t; 
    cin >> t;
    while(t--) {
        int n;
        cin >> n;
        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }
        if(n==3 || n==2){
            if(a[0]==1 && a[1]==1 || a[1]==1 && a[2]==1){
                cout<<"No"<<endl;
            }
        }
        else{
            for(int i=0;i<n-1;i++){
                if(a[i]==1 && a[i+1]==1){
                    
                }
            }
            else{
                cout<<"Yes"<<endl;
            }
        }
    }

    return 0;
}